import React, { useState, useEffect } from 'react';
import './SearchResults.css';
import Header from '../../common/Header';
import Footer from '../../common/Footer';

const SearchResults = ({ searchData, onBack }) => {
  const [selectedOutbound, setSelectedOutbound] = useState(null);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [flightData, setFlightData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeatClass, setSelectedSeatClass] = useState({});
  const [showSeatOptions, setShowSeatOptions] = useState({}); // 좌석 옵션 표시 여부

  // ✅ 항공편 데이터 변환 함수 수정
const transformFlightData = (data, searchDate) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  return data.map(flight => {
    const basePrice = flight.price;
    
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
      bookingDisabled: isPastTime
    };
  });
};

  // API에서 항공편 데이터 가져오기
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
      
      const response = await fetch(
        `http://localhost:8080/api/flight-info/schedule-detail?date=${formattedDate}&departure=${searchData.departure.code}&arrival=${searchData.arrival.code}`
      );
      
      if (response.ok) {
        const text = await response.text();
        
        if (text.trim() === '') {
          setFlightData([]);
        } else {
          try {
            const data = JSON.parse(text);
            
            if (Array.isArray(data)) {
              const searchDate = new Date(departureDate.getFullYear(), departureDate.getMonth(), departureDate.getDate());
              const transformedData = transformFlightData(data, searchDate);
              setFlightData(transformedData);
            } else {
              setFlightData([]);
            }
          } catch (parseError) {
            console.error('JSON 파싱 오류:', parseError);
            setFlightData([]);
          }
        }
      } else if (response.status === 204) {
        setFlightData([]);
      } else {
        console.error('항공편 데이터 조회 실패:', response.status);
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
  
  // 상태를 동시에 설정
  setShowSeatOptions({
    [flightIndex]: classType
  });
  
  // selectedSeatClass도 바로 설정
  setSelectedSeatClass({
    [flightIndex]: { classType, optionIndex: 0 }
  });
  
  console.log('Both states set:', flightIndex, classType); // 디버깅용
};

  // ✅ 세부 옵션 선택 핸들러
  const handleDetailOptionSelect = (flightIndex, classType, optionIndex) => {
    setSelectedSeatClass(prev => ({
      ...prev,
      [flightIndex]: { classType, optionIndex }
    }));
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
                `http://localhost:8080/api/flight-info/schedule-detail?date=${formattedDate}&departure=${searchData.departure.code}&arrival=${searchData.arrival.code}`
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
                
                const minPrice = data.length > 0 ? Math.min(...data.map(flight => flight.price)) : 0;
                
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
        `http://localhost:8080/api/flight-info/schedule-detail?date=${formattedDate}&departure=${searchData.departure.code}&arrival=${searchData.arrival.code}`
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
    return price.toLocaleString() + '원';
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

  const outboundFlights = flightData;

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
 showSeatOptions[selectedOutbound] && (
  <div className="booking-summary-fixed">
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
      <button className="btn-booking">
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