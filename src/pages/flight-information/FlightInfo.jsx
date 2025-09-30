import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import { Calendar, Search } from 'lucide-react';
import styles from './FlightInfo.module.css';
import DateModal from '../home/DateModal';
import SearchModal from '../home/SearchModal';


function FlightInfo() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState('출도착 현황');
    const [searchType, setSearchType] = useState('구간 조회');
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [departureCode, setDepartureCode] = useState('');
    const [arrivalCode, setArrivalCode] = useState('');
    const [flightNumber, setFlightNumber] = useState('');
    const [departureDate, setDepartureDate] = useState('2025.09.25(목)');
    const [returnDate, setReturnDate] = useState('');
    const [isSearchModal, setIsSearchModal] = useState(false);
    const [isDateModal, setIsDateModal] = useState(false);
    const [modalType, setModalType] = useState('departure');
    const [dateData, setDateData] = useState({}); // 날짜별 가격 데이터

    // 도시 선택 함수
    const handleCitySelect = (cityName, cityCode) => {
        console.log('도시 선택됨:', { cityName, cityCode, modalType });
        if (modalType === 'departure') {
            setDeparture(cityName);
            setDepartureCode(cityCode); // 코드도 저장
            console.log('출발지 설정:', { cityName, cityCode });
        } else if (modalType === 'arrival') {
            setArrival(cityName);
            setArrivalCode(cityCode); // 코드도 저장
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
        
        if (type === 'departure') {
            setDepartureDate(formattedDate);
        } else if (type === 'return') {
            setReturnDate(formattedDate);
        }
        
        console.log(`Selected ${type} date:`, formattedDate);
    };

    // URL Query Parameter에 따른 탭 설정
    useEffect(() => {
        const index = searchParams.get('index');
        if (index === '1') {
            setActiveTab('운항 스케줄');
        } else if (index === '2') {
            setActiveTab('출도착 현황');
        } else if (!index) {
            // index가 없으면 운항 스케줄로 리다이렉트
            setSearchParams({ index: '1' });
        }
    }, [searchParams, setSearchParams]);

    // 탭 변경 함수
    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
        if (tabName === '운항 스케줄') {
            setSearchParams({ index: '1' });
        } else if (tabName === '출도착 현황') {
            setSearchParams({ index: '2' });
        }
    };

    return (
        <>
            <Header/>
            <div className={styles['flight-info-container']}>
                <div className={styles['page-header']}>
                    <h1 className={styles['page-title']}>운항 정보</h1>
                    <p className={styles['page-description']}>
                        제주항공의 항공편 현황을 편명 또는 구간으로 조회할 수 있습니다.
                    </p>
                </div>

                <div className={styles['tabs-container']}>
                    <div className={styles['tabs']}>
                        <button 
                            className={`${styles['tab']} ${activeTab === '운항 스케줄' ? styles['active'] : ''}`}
                            onClick={() => handleTabChange('운항 스케줄')}
                        >
                            운항 스케줄
                        </button>
                        <button 
                            className={`${styles['tab']} ${activeTab === '출도착 현황' ? styles['active'] : ''}`}
                            onClick={() => handleTabChange('출도착 현황')}
                        >
                            출도착 현황
                        </button>
                    </div>

                    {activeTab === '운항 스케줄' ? (
                        <>
                            <div className={styles['info-text']}>
                                <p>운항 스케줄은 정부인가 조건이며, 출도착 시간과 기종은 예고 없이 변경될 수 있습니다.</p>
                                <p>출도착 시간은 현지시간 기준입니다. (+1은 다음날)</p>
                            </div>

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
                                        
                                        <button className={styles['schedule-search-button']}>
                                            <Search className={styles['search-icon']} />
                                            조회
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={styles['info-text']}>
                                <p>탑승일과 함께 구간 또는 편명을 입력하시면 조회할 수 있습니다.</p>
                                <p>출도착 시간은 현지시간 기준입니다. (+1은 다음날)</p>
                                <p>탑승객명이 포함된 고객확인서가 필요하신 고객님께서는 <span className={styles['highlight-link']}>'나의 출도착 조회'</span>로 이동해주세요.</p>
                            </div>

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

                            <div className={styles['status-search-form']}>
                                {searchType === '구간 조회' ? (
                                    <div className={styles['status-main-row']}>
                                        <div className={styles['status-target']}>
                                            <button 
                                                onClick={() => { setModalType('departure'); setIsSearchModal(true)}}
                                                type="button" 
                                                className={`${styles['status-start-button']} ${styles['active']}`}
                                            >
                                                <span className={styles['txt']}>{departure || '출발지'}</span>
                                            </button>
                                            
                                            <div className={styles['arrow-icon']}>
                                                <span>→</span>
                                            </div>
                                            
                                            <button 
                                                onClick={() => {setModalType('arrival'); setIsSearchModal(true)}}
                                                type="button" 
                                                className={styles['status-target-button']}
                                            >
                                                <span className={`${styles['txt']} ${styles['before-select']}`}>{arrival || '도착지'}</span>
                                            </button>
                                        </div>
                                        
                                        <div className={styles['status-right-group']}>
                                            <div className={styles['status-date']}>
                                                <button 
                                                    onClick={() => {
                                                        setModalType('departure');
                                                        setIsDateModal(true);
                                                    }}
                                                    type="button" 
                                                    className={styles['status-btn-date']}
                                                >
                                                    <Calendar className={styles['compact-icon']} />
                                                    <span className={styles['txt']}>{departureDate}</span>
                                                </button>
                                            </div>
                                            
                                            <button className={styles['status-search-button']}>
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
                                                <span className={styles['help-text']}>편명은 3~4 자리의 숫자로 입력해주세요.</span>
                                            </div>
                                        </div>
                                        
                                        <div className={styles['input-group']}>
                                            <label className={styles['input-label']}>출발일 선택</label>
                                            <div className={styles['flight-date-wrapper']}>
                                                <input 
                                                    type="text" 
                                                    className={styles['flight-date-field']}
                                                    value={departureDate}
                                                    readOnly
                                                />
                                                <Calendar className={styles['flight-calendar-icon']} />
                                            </div>
                                        </div>
                                        
                                        <button className={styles['search-button']}>
                                            <Search className={styles['search-icon']} />
                                            조회
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    <div className={styles['bottom-info']}>
                        <p>정기편 이외 스케줄 관련 정보는 홈페이지의 [항공권 예매] 메뉴에서 확인해 주세요.</p>
                        <p>결항 및 지연 시간의 경우 반영되지 않을 수 있습니다.</p>
                    </div>
                </div>
            </div>
   
            {isSearchModal && <SearchModal
                isOpen={isSearchModal}
                onClose={() => setIsSearchModal(false)}
                modalType={modalType}
                onSelectCity={handleCitySelect}
            /> }
            
            {isDateModal && <DateModal
                isOpen={isDateModal}
                onClose={() => setIsDateModal(false)}
                modalType={modalType}
                onSelectDate={handleDateSelect}
                departure={departure}
                arrival={arrival}
                departureCode={departureCode}
                arrivalCode={arrivalCode}
                searchType={searchType}
            />}
            
            {/* 디버깅용 - DateModal에 전달되는 값 확인 */}
            {isDateModal && console.log('DateModal에 전달되는 값:', { departure, arrival, modalType })}
        <Footer/>
        </>
    )
}

export default FlightInfo;