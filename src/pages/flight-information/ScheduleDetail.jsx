import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import { Calendar, Search, Plane, ArrowRight } from 'lucide-react';
import styles from './ScheduleDetail.module.css';
import DateModal from '../home/DateModal';
import SearchModal from '../home/SearchModal';
import { apiClient } from '../../apis/FlightInfoApi';


function ScheduleDetail() {
    const location = useLocation();
    const nav = useNavigate();
    
    const {
        departure,
        arrival,
        departureCode,
        arrivalCode,
        departureDate,
        returnDate
    } = location.state || {};
    
   
    
    // 상태 관리
    const [searchType, setSearchType] = useState('왕복');
    const [activeTab, setActiveTab] = useState('가는 편');
    const [isSearchModal, setIsSearchModal] = useState(false);
    const [isDateModal, setIsDateModal] = useState(false);
    const [modalType, setModalType] = useState('departure');
    const [loading, setLoading] = useState(false);
    const [flights, setFlights] = useState([]);


// ScheduleDetail.jsx 수정 부분만!

useEffect(() => {
    const fetchData = async () => {
        if (!departureCode || !arrivalCode || !departureDate) return;
        
        setLoading(true);
        try {
            // 🔍 원본 데이터 확인
            console.log('원본 departureDate:', departureDate);
            console.log('타입:', typeof departureDate);
            
            // ✅ 날짜 형식 변환 함수 (개선 버전)
            const formatDateForBackend = (dateStr) => {
                if (!dateStr) return '';
                
                // "2025.10.01.(화)" -> "2025-10-01" 변환
                let formatted = dateStr
                    .replace(/\([^)]*\)/g, '')  // 괄호와 요일 제거: (화) 삭제
                    .replace(/\./g, '-')        // 점을 하이픈으로: . -> -
                    .replace(/-+/g, '-')        // 연속된 하이픈 하나로: -- -> -
                    .replace(/-+$/, '')         // 끝의 하이픈 제거: 2025-10-01- -> 2025-10-01
                    .trim();                    // 앞뒤 공백 제거
                
                return formatted;
            };
            
            const formattedDate = formatDateForBackend(departureDate);
            
            console.log('변환 후 날짜:', formattedDate); // 디버깅용
            
            const response = await apiClient.get('/schedule-detail', {
                params: {
                    departure: departureCode,
                    arrival: arrivalCode,
                    date: formattedDate  // "2025-09-30" 형식
                }
            });
            
            console.log('받은 데이터:', response.data); // 디버깅용
            setFlights(response.data || []);
            
        } catch (error) {
            console.error('API 호출 실패:', error);
            console.error('에러 상세:', error.response?.data); // 에러 상세 정보
            setFlights([]);
        } finally {
            setLoading(false);
        }
    };
    
    fetchData();
}, [departureCode, arrivalCode, departureDate]);

    console.log('정현이데이터:',flights)
    
    // 도시 선택 함수
    const handleCitySelect = (cityName, cityCode) => {
        console.log('도시 선택됨:', { cityName, cityCode, modalType });
        if (modalType === 'departure') {
            console.log('출발지 설정:', { cityName, cityCode });
        } else if (modalType === 'arrival') {
            console.log('도착지 설정:', { cityName, cityCode });
        }
    };

    // 날짜 선택 함수
    const handleDateSelect = (selectedDate, type) => {
        const formattedDate = selectedDate.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            weekday: 'short'
        }).replace(/\./g, '.').replace(/ /g, '');
        
        console.log(`Selected ${type} date:`, formattedDate);
    };

    // 조회 함수 - 사용자가 직접 구현할 예정
    const handleSearch = () => {
        console.log('조회 실행:', { departure, arrival, departureCode, arrivalCode, departureDate, returnDate });
        // 여기서 API 호출할 예정
    };

    // 날짜 범위 생성 (선택한 날짜 앞뒤 3일씩)
    const generateDateRange = (baseDate) => {
        if (!baseDate) return [];
        
        const dates = [];
        // 날짜 변환 로직 수정
        const cleanDate = baseDate.replace(/\./g, '-').replace(/\([^)]*\)/g, '').trim().replace(/-$/, '');
        console.log('변환된 날짜:', cleanDate);
        
        const base = new Date(cleanDate);
        console.log('생성된 Date 객체:', base);
        
        // 유효한 Date 객체인지 확인
        if (isNaN(base.getTime())) {
            console.error('Invalid base date:', baseDate, '->', cleanDate);
            return [];
        }
        
        // 앞 3일
        for (let i = -3; i <= 3; i++) {
            const date = new Date(base);
            date.setDate(date.getDate() + i);
            
            // 유효한 Date 객체인지 확인
            if (!isNaN(date.getTime())) {
                dates.push({
                    date: date,
                    formatted: date.toLocaleDateString('ko-KR', {
                        month: '2-digit',
                        day: '2-digit'
                    }),
                    isSelected: i === 0
                });
            }
        }
        return dates;
    };

    const dateRange = generateDateRange(departureDate);
    
    // 디버깅용 로그
    console.log('departureDate:', departureDate);
    console.log('dateRange:', dateRange);
    console.log('dateRange.length:', dateRange.length);

    // 더미 데이터 제거 - API에서 받은 실제 데이터 사용

    return (
        <>
            <Header/>
            <div className={styles['schedule-detail-container']}>
                {/* 페이지 헤더 */}
                <div className={styles['page-header']}>
                    <h1 className={styles['page-title']}>운항 스케줄 상세</h1>
                </div>

                {/* 검색 영역 */}
                <div className={styles['tabs-container']}>

                    <div className={styles['trip-type']}>
                        <label className={styles['radio-label']}>
                            <input 
                                type="radio" 
                                name="tripType" 
                                value="왕복"
                                checked={searchType === '왕복'}
                                onChange={(e) => setSearchType(e.target.value)}
                            />
                            <span className={styles['radio-text']}>왕복</span>
                        </label>
                        <label className={styles['radio-label']}>
                            <input 
                                type="radio" 
                                name="tripType" 
                                value="편도"
                                checked={searchType === '편도'}
                                onChange={(e) => setSearchType(e.target.value)}
                            />
                            <span className={styles['radio-text']}>편도</span>
                        </label>
                    </div>

                    <div className={styles['schedule-search-form']}>
                        <div className={styles['schedule-main-row']}>
                            <div className={styles['schedule-target']}>
                                <button
                                    onClick={() => {setModalType('departure'); setIsSearchModal(true)}}
                                    type="button" 
                                    className={`${styles['schedule-start-button']} ${styles['active']}`}
                                >
                                    <span className={styles['txt']}>{departure || '출발지'}</span>
                                </button>
                                
                                <div className={styles['arrow-icon']}>
                                    <span>→</span>
                                </div>
                                
                                <button 
                                    onClick={() =>{setModalType('arrival'); setIsSearchModal(true)}}
                                    type="button" 
                                    className={styles['schedule-target-button']}
                                >
                                    <span className={`${styles['txt']} ${styles['before-select']}`}>{arrival || '도착지'}</span>
                                </button>
                            </div>
                            
                            <div className={styles['schedule-right-group']}>
                                <div className={styles['schedule-date']}>
                                    <button 
                                        onClick={() => {
                                            setModalType('departure');
                                            setIsDateModal(true);
                                        }}
                                        type="button" 
                                        className={styles['schedule-btn-date']}
                                    >
                                        <Calendar className={styles['compact-icon']} />
                                        <span className={styles['txt']}>
                                            {searchType === '왕복' 
                                                ? `${departureDate} ~ ${returnDate || '도착일'}`
                                                : departureDate
                                            }
                                        </span>
                                    </button>
                                </div>
                                
                                <button 
                                    className={styles['schedule-search-button']}
                                    onClick={handleSearch}
                                >
                                    <Search className={styles['search-icon']} />
                                    조회
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 탭 영역 (왕복일 때만) */}
                {searchType === '왕복' && (
                    <div className={styles['tabs-container']}>
                        <div className={styles['tabs']}>
                            <button 
                                className={`${styles['tab']} ${activeTab === '가는 편' ? styles['active'] : ''}`}
                                onClick={() => setActiveTab('가는 편')}
                            >
                                가는 편
                            </button>
                            <button 
                                className={`${styles['tab']} ${activeTab === '오는 편' ? styles['active'] : ''}`}
                                onClick={() => setActiveTab('오는 편')}
                            >
                                오는 편
                            </button>
                        </div>
                    </div>
                )}

                {/* 항공편 목록 */}
                <div className={styles['flights-container']}>
                    <div className={styles['flights-list']}>
                        {loading && <div className={styles['loading']}>항공편 정보를 불러오는 중...</div>}
                        {/* 선택한 날짜의 항공편만 표시 (상세 정보가 있는 것만) */}
                        {flights
                            .filter((flight, index, self) => {
                                // 중복 제거 (같은 flightCode + flightDate 조합은 하나만)
                                const isUnique = index === self.findIndex(f => 
                                    f.flightCode === flight.flightCode && f.flightDate === flight.flightDate
                                );
                                
                                // 선택한 날짜와 같은 날짜이고, 상세 정보가 있는 항공편만 필터링
                                const selectedDate = departureDate.replace(/\./g, '-').replace(/\([^)]*\)/g, '').trim();
                                // 끝에 붙은 - 제거
                                const cleanSelectedDate = selectedDate.replace(/-$/, '');
                                console.log('비교:', cleanSelectedDate, 'vs', flight.flightDate, 'departureTime:', flight.departureTime);
                                
                                return isUnique && flight.flightDate === cleanSelectedDate && flight.departureTime !== null;
                            })
                            .map((flight, index) => {
                                // totalMinutes를 시간:분 형식으로 변환
                                const hours = Math.floor(flight.totalMinutes / 60);
                                const minutes = flight.totalMinutes % 60;
                                const duration = `${hours}시간 ${minutes}분`;
                                
                                return (
                                    <div key={index} className={styles['boarding_detail']}>
                                        <div className={`${styles['boarding__info']} ${styles['time_wrap']}`}>
                                            <div className={styles['flight-info-left']}>
                                                <span className={styles['time-num']}>{flight.departureTime}</span>
                                                <div className={styles['moving_box']}>
                                                    <span className={styles['text_pnr']}>{flight.flightCode}</span>
                                                    <span className={styles['icon-mark']}></span>
                                                    <span className={styles['moving-time']}>{duration}</span>
                                                </div>
                                                <span className={`${styles['time-num']} ${styles['target']}`}>{flight.arrivalTime}</span>
                                            </div>
                                        
                                            <div className={styles['flight-dates-right']}>
                                                <ol className={styles['seukejul_list']}>
                                                    {dateRange.map((dateInfo, dateIndex) => {
                                                        const isToday = dateInfo.isSelected;
                                                        
                                                        // 해당 날짜에 항공편이 있는지 확인 (중복 제거 후)
                                                        const dateStr = dateInfo.date ? dateInfo.date.toISOString().split('T')[0] : null; // YYYY-MM-DD 형식
                                                        const uniqueFlights = flights.filter((flight, index, self) => 
                                                            index === self.findIndex(f => 
                                                                f.flightCode === flight.flightCode && f.flightDate === flight.flightDate
                                                            )
                                                        );
                                                        const hasFlight = dateStr ? uniqueFlights.some(flight => 
                                                            flight.flightDate === dateStr && flight.flightCode !== null
                                                        ) : false;
                                                        
                                                        // 디버깅용 로그
                                                        if (dateIndex < 3) { // 처음 3개만 로그
                                                            console.log(`날짜 ${dateIndex}: ${dateStr}, hasFlight: ${hasFlight}`);
                                                        }

                                                        return (
                                                            <li key={dateIndex}>
                                                                <button
                                                                    type="button"
                                                                    className={`${styles['seukejul-btn']} ${isToday ? styles['today'] : ''}`}
                                                                >
                                                                    <div className={styles['date']}>{dateInfo.formatted}</div>
                                                                    <div className={styles['day']}></div>
                                                                    <div className={styles['resulte']}>
                                                                        {hasFlight && (
                                                                            <div className={styles['plane-icon']}></div>
                                                                        )}
                                                                    </div>
                                                                </button>
                                                            </li>
                                                        );
                                                    })}
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>

                {/* 안내 문구 */}
                <div className={styles['info-section']}>
                    <p className={styles['info-text']}>
                        정기편 이외 스케줄 관련 정보는 홈페이지의 [항공권 예매] 메뉴에서 확인해 주세요.
                    </p>
                    <p className={styles['info-text']}>
                        결항 및 지연 시간의 경우 반영되지 않을 수 있습니다.
                    </p>
                </div>
            </div>

            {/* 모달들 */}
            <SearchModal 
                isOpen={isSearchModal}
                onClose={() => setIsSearchModal(false)}
                modalType={modalType}
                onSelectCity={handleCitySelect}
            />
            
            <DateModal 
                isOpen={isDateModal}
                onClose={() => setIsDateModal(false)}
                modalType={modalType}
                onSelectDate={handleDateSelect}
                searchType={searchType}
            />
            
            <Footer/>
        </>
    );
}

export default ScheduleDetail;