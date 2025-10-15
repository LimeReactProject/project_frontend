import React, { useState, useEffect } from 'react';
import './SearchResults.css';
import Header from '../../common/Header';
import Footer from '../../common/Footer';

const SearchResults = ({ searchData, onBack }) => {
  const [selectedOutbound, setSelectedOutbound] = useState(null);
  const [flightData, setFlightData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeatClass, setSelectedSeatClass] = useState({});
  const [showSeatOptions, setShowSeatOptions] = useState({}); // 좌석 옵션 표시 여부
  const [showSeatSelection, setShowSeatSelection] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showPaymentComplete, setShowPaymentComplete] = useState(false); // ✅ 추가
const loggedPricesRef = React.useRef(new Set());

// DB lime_option 매핑
const OPTION_MAP = {
  '스탠다드':                 { opt_num: '4', opt_name: '스탠다드' },
  '비즈라이트':               { opt_num: '5', opt_name: '비즈라이트' },
  '스탠다드_수하물 PLUS+':     { opt_num: '1', opt_name: '스탠다드_수하물 PLUS+' },
  '스탠다드_수하물 좌석 PLUS+': { opt_num: '2', opt_name: '스탠다드_수하물 좌석 PLUS+' },
  '스탠다드_프리미엄 PLUS+':   { opt_num: '3', opt_name: '스탠다드_프리미엄 PLUS+' },
  '비즈라이트_수하물 PLUS+':   { opt_num: '6', opt_name: '비즈라이트_수하물 PLUS+' },
  '비즈라이트_수하물 좌석 PLUS+': { opt_num: '7', opt_name: '비즈라이트_수하물 좌석 PLUS+' },
  '비즈라이트_프리미엄 PLUS+': { opt_num: '8', opt_name: '비즈라이트_프리미엄 PLUS+' },
};

const toMinutes = (t) => {
  if (!t) return Number.MAX_SAFE_INTEGER;
  const [h, m] = String(t).split(':').map(n => parseInt(n, 10) || 0);
  return h * 60 + m;
};
  // ✅ 항공편 데이터 변환 함수 수정
const transformFlightData = (data, searchDate) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  
  return data.map(flight => {
    console.log('Flight price from API:', flight.price, typeof flight.price);
    
    const extracted = extractPrice(flight);
    const basePrice = extracted ?? 0; // 최후의 보루로 0
    // ✅ 변환된 basePrice 확인
    console.log('Converted basePrice:', basePrice);
        
    // 1단계: 기본 클래스 (스탠다드, 비즈라이트)
    const baseClasses = [
      {
        name: '스탠다드',
        price: basePrice,
        description: '기본적 위탁',
        type: 'standard'
      },
      {
        name: '비즈라이트',
        price: Math.round(basePrice * 2.2),
        description: '프리미엄 서비스와 최대 혜택',
        type: 'bizlite'
      }
    ];

    // ✅ 2단계: 각 클래스별 상세 옵션 - bizlite에도 여러 옵션 추가
    const detailOptions = {
      standard: [
        {
          name: '스탠다드',
          price: basePrice,
          description: '위탁수하물 기본 제공 서비스',
          features: [
            {
              text: '기내수하물 10KG',
              image: 'https://static.jejuair.net/cms/images/fare_service_option/20211012131128759.png'
            },
            {
              text: '위탁수하물 15KG',
              image: 'https://static.jejuair.net/cms/images/fare_service_option/20211014165204436.png'
            }
          ],
          isRecommended: false
        },
        {
          name: '수하물 PLUS+',
          price: Math.round(basePrice * 1.27),
          originalPrice: Math.round(basePrice * 1.55),
          discount: 30,
          description: '추가 수하물과 일반 좌석 선택 서비스',
          features: [
            {
              text: '기내수하물 10KG',
              image: 'https://static.jejuair.net/cms/images/fare_service_option/20211012131128759.png'
            },
            {
              text: '위탁수하물 20KG',
              image: 'https://static.jejuair.net/cms/images/fare_service_option/20211014165204436.png'
            },
            {
              text: '일반 좌석 선택 무료'
            }
          ],
          isRecommended: true
        },
        {
          name: '수하물 좌석 PLUS+',
          price: Math.round(basePrice * 1.35),
          originalPrice: Math.round(basePrice * 1.65),
          discount: 35,
          description: '추가 수하물 넓은 전 좌석을 한 번에!',
          features: [
            {
              text: '기내수하물 10KG',
              image: 'https://static.jejuair.net/cms/images/fare_service_option/20211012131128759.png'
            },
            {
              text: '위탁수하물 20KG',
              image: 'https://static.jejuair.net/cms/images/fare_service_option/20211014165204436.png'
            },
            {
              text: '전 좌석 선택 무료'
            },
            {
              text: '우선 체크인'
            }
          ],
          isRecommended: false
        },
        {
          name: '프리미엄 PLUS+',
          price: Math.round(basePrice * 1.46),
          originalPrice: Math.round(basePrice * 1.83),
          discount: 40,
          description: '추가 수하물, 넓은 좌석과 최대 혜택',
          features: [
            {
              text: '기내수하물 10KG',
              image: 'https://static.jejuair.net/cms/images/fare_service_option/20211012131128759.png'
            },
            {
              text: '위탁수하물 20KG',
              image: 'https://static.jejuair.net/cms/images/fare_service_option/20211014165204436.png'
            },
            {
              text: '전 좌석 선택 무료'
            },
            {
              text: '우선 수하물 수취'
            },
            {
              text: '공항 수속 무료'
            }
          ],
          isRecommended: false
        }
      ],
      bizlite: [
        {
          name: '플렉스',
          price: Math.round(basePrice * 2.2),
          description: '위탁수하물 기본 제공 서비스',
          features: [
            {
              text: '기내수하물 10KG',
              image: 'https://static.jejuair.net/cms/images/fare_service_option/20211012131128759.png'
            },
            {
              text: '위탁수하물 20KG',
              image: 'https://static.jejuair.net/cms/images/fare_service_option/20211014165204436.png'
            },
            {
              text: '전 좌석 선택 무료'
            },
            {
              text: '우선 체크인'
            }
          ],
          isRecommended: false
        },
        {
          name: '수하물 PLUS+',
          price: Math.round(basePrice * 2.4),
          originalPrice: Math.round(basePrice * 2.8),
          discount: 25,
          description: '비즈니스 클래스 추가 수하물 서비스',
          features: [
            {
              text: '기내수하물 15KG',
              image: 'https://static.jejuair.net/cms/images/fare_service_option/20211012131128759.png'
            },
            {
              text: '위탁수하물 30KG',
              image: 'https://static.jejuair.net/cms/images/fare_service_option/20211014165204436.png'
            },
            {
              text: '전 좌석 선택 무료'
            },
            {
              text: '우선 체크인'
            },
            {
              text: '우선 수하물 수취'
            }
          ],
          isRecommended: true
        },
        {
          name: '수하물 좌석 PLUS+',
          price: Math.round(basePrice * 2.6),
          originalPrice: Math.round(basePrice * 3.2),
          discount: 30,
          description: '최고급 비즈니스 서비스',
          features: [
            {
              text: '기내수하물 15KG',
              image: 'https://static.jejuair.net/cms/images/fare_service_option/20211012131128759.png'
            },
            {
              text: '위탁수하물 40KG',
              image: 'https://static.jejuair.net/cms/images/fare_service_option/20211014165204436.png'
            },
            {
              text: '전 좌석 선택 무료'
            },
            {
              text: '우선 체크인'
            },
            {
              text: '우선 수하물 수취'
            },
            {
              text: '공항 라운지 이용'
            },
            {
              text: '무료 기내식'
            }
          ],
          isRecommended: false
        },
        {
          name: '프리미엄 PLUS+',
          price: Math.round(basePrice * 2.8),
          originalPrice: Math.round(basePrice * 3.5),
          discount: 35,
          description: 'VIP 전용 서비스와 최대 혜택',
          features: [
            {
              text: '기내수하물 20KG',
              image: 'https://static.jejuair.net/cms/images/fare_service_option/20211012131128759.png'
            },
            {
              text: '위탁수하물 50KG',
              image: 'https://static.jejuair.net/cms/images/fare_service_option/20211014165204436.png'
            },
            {
              text: '전 좌석 선택 무료'
            },
            {
              text: 'VIP 전용 체크인'
            },
            {
              text: '우선 수하물 수취'
            },
            {
              text: '프리미엄 라운지 이용'
            },
            {
              text: '무료 프리미엄 기내식'
            },
            {
              text: '무료 와이파이'
            }
          ],
          isRecommended: false
        }
      ]
    };

    // 오늘 날짜인 경우에만 시간 체크
    let isPastTime = false;
    if (searchDate && searchDate.getTime() === today.getTime()) {
      const [hours, minutes] = flight.departureTime.split(':');
      const flightDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 
                                    parseInt(hours), parseInt(minutes));
      isPastTime = flightDateTime <= now;
    }
    
    return {
      ...flight,
      baseClasses,
      detailOptions,
      isPastTime,
      bookingDisabled: isPastTime,
          scheduleNum: flight.scheduleNum ?? flight.schedule_num ?? null,
      templateId:  flight.templateId  ?? flight.template_id  ?? null,
    };
  });
};
// 로그 도우미
const logFormatPriceOnce = React.useCallback((price, converted) => {
  if (process.env.NODE_ENV !== 'development') return;
  const key = String(price);
  if (!loggedPricesRef.current.has(key)) {
    console.log('formatPrice input:', price, 'converted:', converted);
    loggedPricesRef.current.add(key);
  }
}, []);
// price 후보 키들 중 첫 번째 유효 숫자 리턴
const extractPrice = (flight) => {
  const candidates = [
    flight.price,
    flight.totalFare,
    flight.total_fare,
    flight.fare,
    flight.amount
  ];
  for (const v of candidates) {
    const n = Number(v);
    if (Number.isFinite(n) && n >= 0) return n;
  }
  return null; // 없으면 null
};

useEffect(() => {
  const fetchFlightData = async () => {
    if (!searchData?.departure?.code || !searchData?.arrival?.code || !searchData?.departureDate) {
      console.log('검색 데이터 부족:', searchData);
      return;
    }

    try {
      setLoading(true);
      
      let departureDate;
      if (searchData.departureDate instanceof Date) {
        departureDate = searchData.departureDate;
      } else {
        departureDate = new Date(searchData.departureDate);
      }
      
      const year = departureDate.getFullYear();
      const month = String(departureDate.getMonth() + 1).padStart(2, '0');
      const day = String(departureDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      
      // ✅ API URL 확인
      const apiUrl = `http://localhost:8080/api/flight-info/schedule-details?date=${formattedDate}&departure=${searchData.departure.code}&arrival=${searchData.arrival.code}`;
      console.log('🔍 API 호출 URL:', apiUrl);
      
      const response = await fetch(apiUrl);
      
      if (response.ok) {
        const text = await response.text();
        
        // ✅ 원본 응답 텍스트 확인
        console.log('🔍 원본 응답 텍스트:', text);
        
        if (text.trim() === '') {
          console.log('📝 빈 응답 받음');
          setFlightData([]);
        } else {
          try {
            const data = JSON.parse(text);
            
            // ✅ 파싱된 데이터 전체 확인
            console.log('🔍 파싱된 전체 데이터:', JSON.stringify(data, null, 2));
            
            if (Array.isArray(data)) {
              // ✅ 각 항공편의 모든 필드 확인
              data.forEach((flight, index) => {
                console.log(`🔍 Flight ${index} 전체 데이터:`, flight);
                console.log(`🔍 Flight ${index} price 필드:`, flight.price, typeof flight.price);
                
                // ✅ 다른 가격 관련 필드가 있는지 확인
                Object.keys(flight).forEach(key => {
                  if (key.toLowerCase().includes('price') || 
                      key.toLowerCase().includes('cost') || 
                      key.toLowerCase().includes('fare') ||
                      key.toLowerCase().includes('amount')) {
                    console.log(`🔍 가격 관련 필드 ${key}:`, flight[key]);
                  }
                });
              });
              
              const searchDate = new Date(departureDate.getFullYear(), departureDate.getMonth(), departureDate.getDate());
              const transformedData = transformFlightData(data, searchDate);
              setFlightData(transformedData);
            } else {
              console.log('📝 배열이 아닌 데이터 받음:', typeof data);
              setFlightData([]);
            }
          } catch (parseError) {
            console.error('JSON 파싱 오류:', parseError);
            console.error('파싱 실패한 텍스트:', text);
            setFlightData([]);
          }
        }
      } else if (response.status === 204) {
        console.log('📝 204 No Content 응답');
        setFlightData([]);
      } else {
        console.error('항공편 데이터 조회 실패:', response.status, response.statusText);
        setFlightData([]);
      }
    } catch (error) {
      console.error('API 호출 오류:', error);
      setFlightData([]);
    } finally {
      setLoading(false);
    }
  };

  fetchFlightData();
}, [searchData]);

  // ✅ 기본 클래스 선택 핸들러
const handleBaseClassSelect = (flightIndex, classType) => {
  console.log('handleBaseClassSelect called:', flightIndex, classType);
  setSelectedOutbound(flightIndex);
  setShowSeatOptions({ [flightIndex]: classType });
  setSelectedSeatClass({}); // 초기화 (혹은 { [flightIndex]: { classType, optionIndex: 0 } }로 기본옵션 자동선택도 가능)
};

const summaryRef = React.useRef(null);

  // ✅ 세부 옵션 선택 핸들러
const handleDetailOptionSelect = (flightIndex, classType, optionIndex) => {
  const flight = outboundFlights?.[flightIndex];
  const opt = flight?.detailOptions?.[classType]?.[optionIndex];

  // 클래스 한글명
  const classDisplay = classType === 'standard' ? '스탠다드' : '비즈라이트';
  // 첫 번째 옵션은 단일명(스탠다드/비즈라이트), 그 외는 "클래스_옵션명"
  const optKey = optionIndex === 0 ? classDisplay : `${classDisplay}_${opt?.name}`;
  const dbOpt = OPTION_MAP[optKey];

  console.log('[선택한 옵션]', {
    flightIndex,
    flightCode: flight?.flightCode,
    classType,
    classDisplay,
    optionIndex,
    optionName: opt?.name,
    price: opt?.price,
    optKey,
    db_opt_num: dbOpt?.opt_num,
    db_opt_name: dbOpt?.opt_name,
  });

  setSelectedOutbound(flightIndex);
  setSelectedSeatClass({ [flightIndex]: { classType, optionIndex } });

  requestAnimationFrame(() => {
    if (summaryRef.current) {
      summaryRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  });
};

  //오늘 날짜 기준으로 과거 날짜인지 확인하는 함수
  const isPastDate = (date) => {
    const now = new Date();
    const targetDate = new Date(date);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const target = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
    return target < today;
  }

  // 날짜별 최저가 조회
  const [dateOptions, setDateOptions] = useState([]);
  
  
  useEffect(() => {
    
    const fetchDateOptions = async () => {
      if (!searchData?.departure?.code || !searchData?.arrival?.code || !searchData?.departureDate) {
        return;
      }

      try {
        let baseDate;
        if (searchData.departureDate instanceof Date) {
          baseDate = new Date(searchData.departureDate);
        } else {
          baseDate = new Date(searchData.departureDate);
        }
        
        const options = [];
        
        for (let i = -3; i <= 3; i++) {
          const targetDate = new Date(baseDate);
          targetDate.setDate(baseDate.getDate() + i);
          
          const year = targetDate.getFullYear();
          const month = String(targetDate.getMonth() + 1).padStart(2, '0');
          const day = String(targetDate.getDate()).padStart(2, '0');
          const formattedDate = `${year}-${month}-${day}`;
          
          const isDisabled = isPastDate(targetDate);
          if (isDisabled) {
            options.push({
              date: targetDate,
              price: 0,
              isSelected: i === 0,
              disabled: true,
              isPast: true
            });
          } else {
            try {
              const response = await fetch(
                `http://localhost:8080/api/flight-info/schedule-details?date=${formattedDate}&departure=${searchData.departure.code}&arrival=${searchData.arrival.code}`
              );
              
              if (response.ok) {
                const text = await response.text();
                
                let data = [];
                if (text.trim() !== '') {
                  try {
                    data = JSON.parse(text);
                    if (!Array.isArray(data)) data = [];
                  } catch (parseError) {
                    data = [];
                  }
                }
                const prices = data
                .map(f => extractPrice(f))
                .filter(n => Number.isFinite(n) && n >= 0);
                const minPrice = prices.length ? Math.min(...prices) : 0;        

                options.push({
                  date: targetDate,
                  price: minPrice,
                  isSelected: i === 0,
                  disabled: false,
                  isPast: false
                });
              } else {
                options.push({
                  date: targetDate,
                  price: 0,
                  isSelected: i === 0,
                  disabled: false,
                  isPast: false
                });
              }
            } catch (error) {
              options.push({
                date: targetDate,
                price: 0,
                isSelected: i === 0,
                disabled: false,
                isPast: false
              });
            }
          }
        }
        setDateOptions(options);
      } catch (error) {
        console.error('날짜 옵션 조회 오류:', error);
      }
    };

    fetchDateOptions();
  }, [searchData]);

  // ✅ 날짜 옵션 클릭 핸들러 수정
  const handleDateOptionClick = async (selectedDate, option) => {
    if (option?.disabled || option?.isPast) {
      return;
    }
    try {
      setLoading(true);
      
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      
      const response = await fetch(
        `http://localhost:8080/api/flight-info/schedule-details?date=${formattedDate}&departure=${searchData.departure.code}&arrival=${searchData.arrival.code}`
      );
      
      if (response.ok) {
        const text = await response.text();
        
        let data = [];
        if (text.trim() !== '') {
          try {
            data = JSON.parse(text);
            if (!Array.isArray(data)) data = [];
          } catch (parseError) {
            data = [];
          }
        }
        
        // ✅ 변환된 데이터 설정
        const targetDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
        const transformedData = transformFlightData(data, targetDate);
        setFlightData(transformedData);
        
        setSelectedOutbound(null);
        setSelectedSeatClass({});
        setShowSeatOptions({});
        
        setDateOptions(prev => prev.map(option => ({
          ...option,
          isSelected: option.date.toDateString() === selectedDate.toDateString()
        })));
        
      } else {
        setFlightData([]);
        setSelectedOutbound(null);
      }
    } catch (error) {
      setFlightData([]);
    } finally {
      setLoading(false);
    }
  };

  // 항공편 선택 핸들러
const handleFlightSelect = (index) => {
  const flight = outboundFlights[index];
  
  if (flight?.bookingDisabled || flight?.isPastTime) {
    return;
  }
  
  // ✅ 이미 선택된 항공편을 다시 클릭한 경우
  if (selectedOutbound === index) {
    // 이미 선택된 항공편이면 선택 해제하고 모든 옵션 메뉴 닫기
    setSelectedOutbound(null);
    setShowSeatOptions({});
    setSelectedSeatClass({});
  } else {
    // ✅ 다른 항공편을 선택한 경우
    setSelectedOutbound(index);
    
    // 모든 옵션 메뉴를 초기화하고 선택된 좌석 클래스도 초기화
    setShowSeatOptions({});
    setSelectedSeatClass({});
  }
};

const formatPrice = (price) => {
  const n = Number(price);

  // 기존 console.log 대신
  logFormatPriceOnce(price, n);

  if (!Number.isFinite(n) || n < 0) return '가격조회불가';
  return n.toLocaleString('ko-KR') + '원';
};

  const formatDate = (date) => {
    const targetDate = date instanceof Date ? date : new Date(date);
    return targetDate.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit', 
      day: '2-digit',
      weekday: 'short'
    });
  };

  const formatDateForSlider = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[date.getDay()];
    
    return `${month}.${day} (${weekday})`;
  };

  const calculateDuration = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}시간 ${minutes}분`;
  };
const outboundFlights = React.useMemo(
  () => [...flightData].sort((a, b) => toMinutes(a.departureTime) - toMinutes(b.departureTime)),
  [flightData]
);
  if (loading) {
    return (
      <React.Fragment>
        <Header />
        <main className="search-results-main">
          <div className="loading-message">항공편 정보를 불러오는 중...</div>
        </main>
        <Footer />
      </React.Fragment>
    );
  }


const handleBookingClick = async () => {
  if (selectedOutbound !== null && selectedSeatClass[selectedOutbound]) {
    const selectedFlight = outboundFlights[selectedOutbound];
    const seatClassInfo = selectedSeatClass[selectedOutbound];
    const flight = outboundFlights[selectedOutbound];

    const sc = selectedSeatClass[selectedOutbound] || { classType: showSeatOptions[selectedOutbound], optionIndex: 0 };
    const selectedOption = selectedFlight.detailOptions[seatClassInfo.classType][seatClassInfo.optionIndex];
    const classDisplay = seatClassInfo.classType === 'standard' ? '스탠다드' : '비즈라이트';
    const optKey = seatClassInfo.optionIndex === 0
      ? classDisplay
      : `${classDisplay}_${selectedOption.name}`;
    const dbOpt = OPTION_MAP[optKey];
    // 좌석 조회 호출 (templateId 기준)
    let seats = [];
    try {
      const tid = flight.templateId ?? flight.template_id;
      if (!tid) {
        console.warn('[SearchResults] templateId가 없습니다. 좌석 조회를 건너뜁니다.');
      } else {
        const seatRes = await fetch(`http://localhost:8080/api/flight-info/seats?templateId=${tid}`);
        if (seatRes.ok) {
          seats = await seatRes.json();
          console.log('[SearchResults] fetched seats:', seats);
        } else {
          console.warn('[SearchResults] 좌석 조회 실패:', seatRes.status, seatRes.statusText);
        }
      }
    } catch (e) {
      console.error('[SearchResults] 좌석 조회 에러:', e);
    }

    const bookingInfo = {
      flightCode: selectedFlight.flightCode,
      departure: searchData.departure.city,
      arrival: searchData.arrival.city,
      date: formatDate(searchData.departureDate),
      time: `${selectedFlight.departureTime} - ${selectedFlight.arrivalTime}`,
      className: selectedOption.name,
      price: selectedOption.price.toLocaleString(),
      classType: seatClassInfo.classType,
      scheduleNum: flight.scheduleNum ?? flight.schedule_num ?? null,
      templateId: flight.templateId ?? flight.template_id ?? null,
      opt_num: dbOpt?.opt_num || null,
      opt_name: dbOpt?.opt_name || null,
      optNum: dbOpt?.opt_num || null,   // ← 추가
      optName: dbOpt?.opt_name || null, // ← 추가
      seats, // ← 여기로 좌석을 넣어서 SeatSelection에 전달
    };

    setBookingData(bookingInfo);
    setShowSeatSelection(true);
  }
};
 // ✅ 좌석 선택 페이지에서 뒤로가기
 const handleSeatSelectionBack = () => {
  setShowSeatSelection(false);
  setBookingData(null);
};

// ✅ 좌석 선택 완료
const handleSeatSelectionConfirm = (finalBookingData) => {
  console.log('최종 예약 데이터:', finalBookingData);
  setBookingData(finalBookingData);
  setShowSeatSelection(false);
  setShowPayment(true);
};
// ✅ 결제 페이지에서 뒤로가기
const handlePaymentBack = () => {
  setShowPayment(false);
  setShowSeatSelection(true);
};

// ✅ 결제 완료
const handlePaymentComplete = (paymentResult) => {
  console.log('결제 완료:', paymentResult);
  setShowPayment(false);
  setShowPaymentComplete(true); // ✅ 결제 완료 페이지 표시
};

  if (showPaymentComplete && bookingData) {
    const PaymentComplete = React.lazy(() => import('./PaymentComplete'));
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <PaymentComplete 
          bookingData={bookingData}
          onGoHome={() => {
            setShowPaymentComplete(false);
            setShowPayment(false);
            setShowSeatSelection(false);
            setBookingData(null);
            setSelectedOutbound(null);
            setSelectedSeatClass({});
            setShowSeatOptions({});
            // 필요시 홈으로 이동 로직 추가
          }}
          onViewReservation={() => {
            // 예약 관리 페이지로 이동 로직 추가
            console.log('예약 관리 페이지로 이동');
          }}
        />
      </React.Suspense>
    );
  }
 // ✅ 결제 페이지 렌더링 조건 추가
  if (showPayment && bookingData) {
    const Payment = React.lazy(() => import('./Payment'));
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Payment 
          bookingData={bookingData}
          onBack={handlePaymentBack}
          onPaymentComplete={handlePaymentComplete} // ✅ 핸들러 전달
        />
      </React.Suspense>
    );
  }


// ✅ 좌석 선택 페이지 렌더링
if (showSeatSelection && bookingData) {
  const SeatSelection = React.lazy(async () => {
    try {
      const m = await import('./SeatSelection');
      // default 없을 때도 대비
      return { default: m.default ?? m.SeatSelection };
    } catch (e) {
      console.error('[Lazy] SeatSelection 로드 실패:', e);
      throw e;
    }
  });
return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <SeatSelection
        flightData={bookingData}
        onBack={handleSeatSelectionBack}
        onConfirm={handleSeatSelectionConfirm}
      />
    </React.Suspense>
  );
}

  return (
    <React.Fragment>
      <Header />
      <main className="search-results-main">
        <div className="search-header">
          <div className="search-info">
            <div className="route-info">
              <span className="route">
                {searchData?.departure?.city || '출발지'} → {searchData?.arrival?.city || '도착지'}
              </span>
              <span className="date">
                {searchData?.departureDate ? formatDate(searchData.departureDate) : '날짜 미선택'}
              </span>
              <span className="passenger">
                성인 {searchData?.passengerCounts?.adult || 1}명
              </span>
            </div>
            <button className="modify-search-btn" onClick={onBack}>
              항공편 다시 검색
            </button>
          </div>
        </div>

        <div className="search-content">
          <div className="flight-section">
            <div className="section-header">
              <h3>가는 편</h3>
              <div className="date-slider">
                <button className="date-prev">←</button>
                <div className="date-options">
                    {dateOptions.map((option, index) => (
                        <div 
                        key={index} 
                        className={`date-option ${option.isSelected ? 'selected' : ''} ${option.disabled ? 'disabled' : ''} ${option.isPast ? 'past' : ''}`}
                        onClick={() => handleDateOptionClick(option.date, option)}
                        style={{
                            cursor: option.disabled ? 'not-allowed' : 'pointer',
                            opacity: option.disabled ? 0.5 : 1,
                            backgroundColor: option.disabled ? '#f5f5f5' : '',
                            color: option.disabled ? '#999' : ''
                        }}
                        >
                        <div className="date">{formatDateForSlider(option.date)}</div>
                        <div className="price">
                            {option.isPast ? '예약불가' : 
                            option.price > 0 ? `${formatPrice(option.price)}~` : '조회불가'}
                        </div>
                        </div>
                    ))}
                </div>
                <button className="date-next">→</button>
              </div>
            </div>

            <div className="flight-filters">
              <div className="filter-group">
                <label>출발시간순</label>
              </div>
            </div>

            <div className="flight-list">
              {outboundFlights.length > 0 ? (
                outboundFlights.map((flight, index) => (
                  <div key={index} className="flight-item-container">
                    <div 
                      className={`flight-item ${selectedOutbound === index ? 'selected' : ''} ${flight.isPastTime ? 'past-time' : ''}`}
                      onClick={() => handleFlightSelect(index)}
                      style={{
                        cursor: flight.isPastTime ? 'not-allowed' : 'pointer',
                        opacity: flight.isPastTime ? 0.6 : 1,
                        backgroundColor: flight.isPastTime ? '#f8f8f8' : ''
                      }}
                    >
                      <div className="flight-info">
                        <div className="flight-number">{flight.flightCode}</div>
                        <div className="flight-time">
                          <div className="time">
                            <span className="departure-time">{flight.departureTime}</span>
                            <span className="duration">{calculateDuration(flight.totalMinutes)}</span>
                            <span className="arrival-time">{flight.arrivalTime}</span>
                          </div>
                          <div className="route-line">
                            <div className="route-dot start"></div>
                            <div className="route-path"></div>
                            <div className="route-dot end"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* ✅ 과거 시간이 아닌 경우 기본 클래스 버튼들 표시 */}
                      {!flight.isPastTime && (
                        <div className="base-class-options">
                          {flight.baseClasses?.map((baseClass, classIndex) => (
                            <div 
                              key={classIndex}
                              className={`base-class-button ${showSeatOptions[index] === baseClass.type ? 'active' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleBaseClassSelect(index, baseClass.type);
                              }}
                            >
                              <div className="base-class-name">{baseClass.name}</div>
                              <div className="base-class-price">{formatPrice(baseClass.price)}</div>
                              <div className="base-class-desc">{baseClass.description}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* 과거 시간 항공편 표시 */}
                      {flight.isPastTime && (
                        <div className="flight-price-disabled">
                          <div className="seat-class" style={{color: '#999'}}>
                            예약마감
                          </div>
                          <div className="price" style={{color: '#999'}}>
                            시간만료
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* ✅ 세부 옵션이 표시될 때만 표시 - 안전 체크 추가 */}
{/* ✅ 세부 옵션이 표시될 때만 표시 - 체크박스 추가 */}
{!flight.isPastTime && showSeatOptions[index] && flight.detailOptions && flight.detailOptions[showSeatOptions[index]] && (
  <div className="detail-options-container">
    <div className="detail-options">
      {flight.detailOptions[showSeatOptions[index]].map((option, optionIndex) => (
        <div 
          key={optionIndex}
          className={`detail-option-card ${
            selectedSeatClass[index]?.classType === showSeatOptions[index] && 
            selectedSeatClass[index]?.optionIndex === optionIndex ? 'selected' : ''
          } ${option.isRecommended ? 'recommended' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            handleDetailOptionSelect(index, showSeatOptions[index], optionIndex);
          }}
        >

          
          {/* ✅ 체크박스 */}
          <div className="detail-option-checkbox">
            <input 
              type="radio" 
              name={`flight-${index}-option`}
              checked={
                selectedSeatClass[index]?.classType === showSeatOptions[index] && 
                selectedSeatClass[index]?.optionIndex === optionIndex
              }
              onChange={() => {}}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          {/* ✅ 정보 영역 - 구조 변경 */}
          <div className="detail-option-left">
            <div className="detail-option-header">
              <div className="detail-option-header-left">
                <h4 className="detail-option-name">{option.name}</h4>
                
                {/* ✅ 할인 정보 */}
                {option.discount && (
                  <div className="discount-info">
                    <span className="original-price">{formatPrice(option.originalPrice)}</span>
                    <span className="discount-rate">{option.discount}% 할인</span>
                  </div>
                )}
              </div>
              
              {/* ✅ 가격을 헤더 오른쪽에 배치 */}
              <div className="detail-option-price">{formatPrice(option.price)}</div>
            </div>
            
            <div className="detail-option-description">
              {option.description}
            </div>
            
                <div className="detail-option-features">
                <ul className="benefit-list">
                    {option.features.map((feature, featureIndex) => (
                    <li 
                        key={featureIndex} 
                        className={`benefit-list-item ${feature.image ? 'has-image' : ''}`}
                    >
                        {feature.image && (
                        <img 
                            src={feature.image} 
                            alt={feature.text}
                            loading="lazy"
                        />
                        )}
                        {feature.text || feature}
                    </li>
                    ))}
                </ul>
                </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
                  </div>
                ))
              ) : (
                <div className="no-flights">
                  <p>해당 날짜에 운항하는 항공편이 없습니다.</p>
                  <p>다른 날짜를 선택해 주세요.</p>
                </div>
              )}
            </div>
          </div>

          {/* 선택된 항공편이 있을 때만 표시 */}

{/* ✅ booking-summary 조건 수정 - selectedSeatClass 조건 완화 */}
{selectedOutbound !== null && 
 !outboundFlights[selectedOutbound]?.isPastTime && 
 selectedSeatClass[selectedOutbound] && (
  <div className="booking-summary-fixed" ref={summaryRef}>
    <div className="summary-content">
      <div className="selected-flights">
        <div className="selected-flight">
          <span>가는편: {outboundFlights[selectedOutbound].flightCode}</span>
          <div className="selected-class-info">
            <span className="class-name">
              {selectedSeatClass[selectedOutbound] 
                ? outboundFlights[selectedOutbound].detailOptions[selectedSeatClass[selectedOutbound].classType][selectedSeatClass[selectedOutbound].optionIndex].name
                : outboundFlights[selectedOutbound].detailOptions[showSeatOptions[selectedOutbound]][0].name
              }
            </span>
            <span className="class-price">
              {formatPrice(
                selectedSeatClass[selectedOutbound] 
                  ? outboundFlights[selectedOutbound].detailOptions[selectedSeatClass[selectedOutbound].classType][selectedSeatClass[selectedOutbound].optionIndex].price
                  : outboundFlights[selectedOutbound].detailOptions[showSeatOptions[selectedOutbound]][0].price
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="total-price">
        <span>총 요금</span>
        <span className="total-amount">
          {formatPrice(
            selectedSeatClass[selectedOutbound] 
              ? outboundFlights[selectedOutbound].detailOptions[selectedSeatClass[selectedOutbound].classType][selectedSeatClass[selectedOutbound].optionIndex].price
              : outboundFlights[selectedOutbound].detailOptions[showSeatOptions[selectedOutbound]][0].price
          )}
        </span>
      </div>
      <button className="btn-booking" onClick={handleBookingClick}>
        예약하기
      </button>
    </div>
  </div>
)}


        </div>
      </main>
    </React.Fragment>
  );
};

export default SearchResults;