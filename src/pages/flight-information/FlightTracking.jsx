import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, Search, Plane, FileText } from "lucide-react";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import DateModal from "../home/DateModal";
import SearchModal from "../home/SearchModal";
import CustomerIdentificationModal from "../../components/CustomerIdentificationModal";
import { apiClient } from "../../apis/FlightInfoApi";
import styles from './FlightTracking.module.css';

function FlightTracking() {
    const location = useLocation();
    const nav = useNavigate();

    const {
        // 편명 조회용 데이터
        flightNumber: initialFlightNumber,
        departureDate,
        searchType: initialSearchType,
        // 구간 조회용 데이터
        departure,
        arrival,
        departureCode,
        arrivalCode,
        returnDate
    } = location.state || {};
    
    // 상태 관리
    const [searchType, setSearchType] = useState(initialSearchType || '구간 조회');
    const [flightNumber, setFlightNumber] = useState(initialFlightNumber || '');
    const [currentDeparture, setCurrentDeparture] = useState(departure || '');
    const [currentArrival, setCurrentArrival] = useState(arrival || '');
    const [currentDepartureCode, setCurrentDepartureCode] = useState(departureCode || '');
    const [currentArrivalCode, setCurrentArrivalCode] = useState(arrivalCode || '');
    const [currentDepartureDate, setCurrentDepartureDate] = useState(departureDate || '');
    const [isSearchModal, setIsSearchModal] = useState(false);
    const [isDateModal, setIsDateModal] = useState(false);
    const [modalType, setModalType] = useState('departure');
    const [loading, setLoading] = useState(false);
    const [flights, setFlights] = useState([]);
    const [isCustomerModal, setIsCustomerModal] = useState(false);
    const [customerData, setCustomerData] = useState(null);
    
    // 도시 선택 함수
    const handleCitySelect = (cityName, cityCode) => {
        if (modalType === 'departure') {
            setCurrentDeparture(cityName);
            setCurrentDepartureCode(cityCode);
        } else if (modalType === 'arrival') {
            setCurrentArrival(cityName);
            setCurrentArrivalCode(cityCode);
        }
        setIsSearchModal(false);
    };

    // 날짜 선택 함수
    const handleDateSelect = (selectedDate, type) => {
        const formattedDate = selectedDate.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            weekday: 'short'
        }).replace(/ /g, '');
        
        setCurrentDepartureDate(formattedDate);
        setIsDateModal(false);
    };

    // 조회 함수
    const handleSearch = () => {
        if (searchType === '구간 조회') {
            // 구간 조회 검증
            if (!currentDepartureCode) {
                alert('출발지를 선택해주세요.');
                return;
            }
            if (!currentArrivalCode) {
                alert('도착지를 선택해주세요.');
                return;
            }
            if (!currentDepartureDate) {
                alert('출발일을 선택해주세요.');
                return;
            }
        } else {
            // 편명 조회 검증
            if (!flightNumber) {
                alert('편명을 입력해주세요.');
                return;
            }
            if (!currentDepartureDate) {
                alert('출발일을 선택해주세요.');
                return;
            }
        }
        
        fetchFlightData();
        
    };
       


  
    const fetchRouteData = async () => {
        setLoading(true);
        try {
            const params = {
                date: currentDepartureDate.replace(/\./g, '-').replace(/\([^)]*\)/g, '').trim().replace(/-+$/, ''),
                departure: currentDepartureCode,
                arrival: currentArrivalCode
            };
            const response = await apiClient.get('/flight-tracking', { params });
            setFlights(response.data || []);
        } catch (error) {
            console.error('구간 조회 API 호출 실패:', error);
            setFlights([]);
        } finally {
            setLoading(false);
        }
    };
    
    const fetchFlightCodeData = async () => {
        setLoading(true);
        try {
            const params = {
                date: currentDepartureDate.replace(/\./g, '-').replace(/\([^)]*\)/g, '').trim().replace(/-+$/, ''),
                flightCode: flightNumber
            };
            const response = await apiClient.get('/flightCode-search', { params });
            setFlights(response.data || []);
        } catch (error) {
            console.error('편명 조회 API 호출 실패:', error);
            setFlights([]);
        } finally {
            setLoading(false);
        }
    };
    
    const fetchFlightData = async () => {
        if (searchType === '구간 조회') {
            await fetchRouteData();
        } else {
            await fetchFlightCodeData();
        }
    };

    // 고객확인서 조회 함수
    const fetchCustomerIdentification = async (flightCode, departureCode, arrivalCode, flightDate) => {
        try {
            console.log('원본 날짜:', flightDate);
            
            // 날짜 형식 변환: 2025.10.01.(수) -> 2025-10-01
            let formattedDate = flightDate
                .replace(/\./g, '-')  // 점을 하이픈으로 변경
                .replace(/\([^)]*\)/g, '')  // 괄호와 그 안의 내용 제거
                .replace(/-+$/, '')  // 끝에 있는 하이픈들 제거
                .trim();  // 공백 제거
            
            console.log('변환된 날짜:', formattedDate);
            console.log('요청 파라미터:', { flightCode, departureCode, arrivalCode, flightDate: formattedDate });
            
            const params = {
                flightCode,
                departureCode,
                arrivalCode,
                flightDate: formattedDate
            };
            const response = await apiClient.get('/customer-identification-form', { params });
            console.log('백엔드 응답 전체:', response);
            console.log('백엔드 응답 데이터:', response.data);
            setCustomerData(response.data);
            setIsCustomerModal(true);
        } catch (error) {
            console.error('고객확인서 조회 실패:', error);
            console.error('에러 상세:', error.response?.data);
            alert('고객확인서를 불러올 수 없습니다.');
        }
    };
     
        useEffect(()=>{
            fetchFlightData();
        },[departure, arrival, departureCode, arrivalCode, departureDate, flightNumber, searchType])




   
 

    return (
        <>
            <Header/>
            <div className={styles['flight-tracking-container']}>
                {/* 페이지 헤더 */}
                <div className={styles['page-header']}>
                    <h1 className={styles['page-title']}>출도착 현황</h1>
                    <p className={styles['page-description']}>
                        탑승일과 함께 구간 또는 편명을 입력하시면 조회할 수 있습니다.
                    </p>
                </div>

                {/* 검색 영역 */}
                <div className={styles['search-container']}>
                    {/* 조회 타입 선택 */}
                    <div className={styles['search-type']}>
                        <label className={styles['radio-label']}>
                            <input 
                                type="radio" 
                                name="searchType" 
                                value="구간 조회"
                                checked={searchType === '구간 조회'}
                                onChange={(e) => setSearchType(e.target.value)}
                            />
                            <span className={styles['radio-text']}>구간 조회</span>
                        </label>
                        <label className={styles['radio-label']}>
                            <input 
                                type="radio" 
                                name="searchType" 
                                value="편명 조회"
                                checked={searchType === '편명 조회'}
                                onChange={(e) => setSearchType(e.target.value)}
                            />
                            <span className={styles['radio-text']}>편명 조회</span>
                        </label>
                    </div>

                    {/* 검색 폼 - ScheduleDetail과 동일한 구조 */}
                    <div className={styles['search-form']}>
                        {searchType === '구간 조회' ? (
                            <div className={styles['schedule-main-row']}>
                                <div className={styles['schedule-target']}>
                                    <button
                                        onClick={() => {setModalType('departure'); setIsSearchModal(true)}}
                                        type="button" 
                                        className={`${styles['schedule-start-button']} ${styles['active']}`}
                                    >
                                        <span className={styles['txt']}>{currentDeparture || '출발지'}</span>
                                    </button>
                                    
                                    <div className={styles['arrow-icon']}>
                                        <span>→</span>
                                    </div>
                                    
                                    <button 
                                        onClick={() =>{setModalType('arrival'); setIsSearchModal(true)}}
                                        type="button" 
                                        className={styles['schedule-target-button']}
                                    >
                                        <span className={`${styles['txt']} ${styles['before-select']}`}>{currentArrival || '도착지'}</span>
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
                                            <span className={styles['txt']}>{currentDepartureDate}</span>
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
                        ) : (
                            <div className={styles['flight-search-form']}>
                                <div className={styles['input-group']}>
                                    <label className={styles['input-label']}>편명</label>
                                    <input 
                                        type="text" 
                                        className={styles['flight-number-field']}
                                        placeholder="편명을 입력하세요"
                                        value={flightNumber}
                                        onChange={(e) => setFlightNumber(e.target.value)}
                                    />
                                    <div className={styles['input-help']}>
                                        <span className={styles['help-icon']}>i</span>
                                        <span className={styles['help-text']}>편명은 5자리로 입력해주세요.</span>
                                    </div>
                                </div>
                                
                                <div className={styles['input-group']}>
                                    <label className={styles['input-label']}>출발일 선택</label>
                                    <div 
                                        className={styles['flight-date-wrapper']}
                                        onClick={() => {
                                            setModalType('departure');
                                            setIsDateModal(true);
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <input 
                                            type="text" 
                                            className={styles['flight-date-field']}
                                            value={currentDepartureDate}
                                            readOnly
                                        />
                                        <Calendar className={styles['flight-calendar-icon']} />
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={handleSearch}
                                    className={styles['search-button']}>
                                    <Search className={styles['search-icon']} />
                                    조회
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* 항공편 목록 */}
                <div className={styles['flights-container']}>
                    {loading && <div className={styles['loading']}>항공편 정보를 불러오는 중...</div>}
                    
                    
                
                    {flights.map((item,index)=> (

                       <div key={index} className={styles['flights-list']}>
                       
                        <div className={styles['boarding-wrap']}>
                            <div className={styles['flight-card']}>
                                {/* 왼쪽 영역 - 편명과 상태 */}
                                <div className={styles['flight-left']}>
                                    <div className={styles['flight-number']}>
                                    
                                        {item.flightCode}
                                    </div>
                                    <div className={styles['flight-status']}>
                                    
                                        {item.flightStatus}
                                        
                                    </div>
                                </div>
                                
                                {/* 오른쪽 영역 - 시간 정보 */}
                                <div className={styles['flight-right']}>
                                    <div className={styles['time-container']}>
                                        {/* 출발 시간 섹션 */}
                                        <div className={styles['departure-section']}>
                                            <div className={styles['time-main']}>
                                                 {item.departure_time ? item.departure_time.split(' ')[1].substring(0, 5) : '-'}
                                                
                                            </div>
                                            <div className={styles['time-details']}>
                                                <div className={styles['actual-time']}>
                                                    출발 - {item.actual_departure_time ? item.actual_departure_time.split('T')[1].substring(0, 5) : '-'}
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* 가운데 화살표 */}
                                        <div className={styles['time-arrow']}>→</div>
                                        
                                        {/* 도착 시간 섹션 */}
                                        <div className={styles['arrival-section']}>
                                            <div className={styles['time-main']}>
                                                {item.arrival_time ? item.arrival_time.split(' ')[1].substring(0, 5) : '-'} 
                                                
                                            </div>
                                            <div className={styles['time-details']}>
                                                <div className={styles['actual-time']}>
                                                    도착 - {item.actual_arrival_time ? item.actual_arrival_time.split('T')[1].substring(0, 5) : '-'} 
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* 고객확인서 버튼 - 비운항인 경우에만 표시 */}
                                    {item.flightStatus === '비운항' && (
                                        <div className={styles['customer-button-container']}>
                                            <button 
                                                className={styles['customer-button']}
                                                onClick={() => {
                                                    if (searchType === '구간 조회') {
                                                        fetchCustomerIdentification(
                                                            item.flightCode, 
                                                            currentDepartureCode, 
                                                            currentArrivalCode, 
                                                            currentDepartureDate
                                                        );
                                                    } else {
                                                        // 편명 조회의 경우 출발지/도착지 정보가 없으므로 기본값 사용
                                                        fetchCustomerIdentification(
                                                            item.flightCode, 
                                                            'ICN', // 기본값
                                                            'NRT', // 기본값
                                                            currentDepartureDate
                                                        );
                                                    }
                                                }}
                                            >
                                                <FileText size={16} />
                                                고객확인서
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
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
                searchType="편도"
                allowPastDates={true}
            />
            
            <CustomerIdentificationModal 
                isOpen={isCustomerModal}
                onClose={() => setIsCustomerModal(false)}
                data={customerData}
            />
            
            <Footer/>
        </>
    );
}

export default FlightTracking;