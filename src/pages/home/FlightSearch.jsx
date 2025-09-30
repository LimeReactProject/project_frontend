import React, { useState } from 'react';
import styles from '../../css/home/FlightSearch.module.css';
import { Calendar, Users, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function FlightSearch({ onOpenModal, onOpenDateModal }) {
    const [tripType, setTripType] = useState('왕복');
    const [activeTab, setActiveTab] = useState('항공권 예매');
    const [activeSubTab, setActiveSubTab] = useState('운항 스케줄');
    const navigate= useNavigate();
    

    return (
        <div className={styles['flight-overlay-container']}>
            {/* 탭 메뉴 - 박스 위쪽에 배치 */}
            <div className={styles['compact-tabs']}>
                <button
                    className={`${styles['compact-tab']} ${activeTab === '항공권 예매' ? styles['active'] : styles['inactive']}`}
                    onClick={() => setActiveTab('항공권 예매')}
                >
                    항공권 예매
                </button>
                <button
                    className={`${styles['compact-tab']} ${activeTab === '예약 조회' ? styles['active'] : styles['inactive']}`}
                    onClick={() => setActiveTab('예약 조회')}
                >
                    예약 조회
                </button>
                <button
                    className={`${styles['compact-tab']} ${activeTab === '운항 조회' ? styles['active'] : styles['inactive']}`}
                    onClick={() => setActiveTab('운항 조회')}
                >
                    운항 조회
                </button>
            </div>
            
            <div className={styles['compact-form-card']}>
                {/* 항공권 예매 */}
                {activeTab === '항공권 예매' && (
                    <>
                        <div className={styles['compact-trip-type']}>
                            <span 
                                className={tripType === '왕복' ? styles['active'] : styles['inactive']}
                                onClick={() => setTripType('왕복')}
                            >
                                왕복
                            </span>
                            <span 
                                className={tripType === '편도' ? styles['active'] : styles['inactive']}
                                onClick={() => setTripType('편도')}
                            >
                                편도
                            </span>
                        </div>

                        {/* 출발지/도착지와 날짜/성인을 같은 줄에 배치 */}
                        <div className={styles['ticketing-main-row']}>
                            {/* 왼쪽: 출발지/도착지 */}
                            <div className={styles['ticketing-target']}>
                                <button 
                                    type="button" 
                                    className={`${styles['start-button']} ${styles['active']}`}
                                    onClick={() => onOpenModal({ type: 'departure' })}
                                >
                                    <span className={styles['txt']}>서울(김포)</span>
                                </button>
                                {/* 왕복일 때만 교환 버튼 표시 */}
                                {tripType === '왕복' && (
                                    <button type="button" className={styles['btn-exchange']}>
                                        <span className={styles['exchange-icon']}></span>
                                    </button>
                                )}
                                <button 
                                    type="button" 
                                    className={styles['target-button']}
                                    onClick={() => onOpenModal({ type: 'arrival' })}
                                >
                                    <span className={`${styles['txt']} ${styles['before-select']}`}>도착지</span>
                                </button>
                            </div>
                            
                            {/* 오른쪽: 날짜/성인 */}
                            <div className={styles['ticketing-right-group']}>
                                <div className={styles['ticketing-date']}>
                                    <button 
                                        type="button" 
                                        className={styles['btn-date']}
                                        onClick={() => onOpenDateModal({ type: 'departure' })}
                                    >
                                        <Calendar className={styles['compact-icon']} />
                                        <span className={styles['txt']}>
                                            {tripType === '왕복' 
                                                ? '2025.09.24(수) ~ 2025.10.01(수)' 
                                                : '2025.09.24(수)'
                                            }
                                        </span>
                                    </button>
                                </div>
                                <div className={styles['ticketing-passenger']}>
                                    <button type="button" className={styles['btn-passenger']}>
                                        <Users className={styles['compact-icon']} />
                                        <span className={styles['txt']}>성인 1</span>
                                        <ChevronDown className={styles['compact-icon']} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 검색버튼 */}
                        <div className={styles['compact-search-wrapper']}>
                            <button className={styles['compact-search-btn']}>
                                항공권 검색
                            </button>
                        </div>
                    </>
                )}

                {/* 예약 조회 */}
                {activeTab === '예약 조회' && (
                    <div className={styles['compact-reservation-form']}>
                        {/* 2x2 그리드 레이아웃 */}
                        <div className={styles['reservation-form-grid']}>
                            <div className={styles['reservation-form-group']}>
                                <label>예약번호</label>
                                <input 
                                type="text" 
                                className={styles['reservation-input-btn']} 
                                placeholder="예약번호를 입력하세요"
                                maxLength={6}
                                >
                                </input>
                            </div>
                            <div className={styles['reservation-form-group']}>
                                <label>탑승일자</label>
                                <button type="button" className={styles['reservation-input-btn']}>
                                    <Calendar className={styles['compact-icon']} />
                                    <span className={styles['txt']}>YYYY.MM.DD</span>
                                </button>
                            </div>
                            <div className={styles['reservation-form-group']}>
                                <label>성</label>
                                <input type="text" className={styles['reservation-input-btn']} placeholder="성">
                                </input>
                            </div>
                            <div className={styles['reservation-form-group']}>
                                <label>이름</label>
                                <input type="text" className={styles['reservation-input-btn']} placeholder="이름">
                                </input>
                            </div>
                        </div>
                        
                        {/* 안내 문구와 예약 조회 버튼을 같은 줄에 배치 */}
                        <div className={styles['reservation-bottom-row']}>
                            <div className={styles['compact-info-text']}>
                                <p>• 여행사, 공항, 고객센터, 비회원 예약 고객님도 조회 가능합니다.</p>
                                <p>• 예약시 입력한 탑승객명을 입력해 주세요.</p>
                                <p>• 국제선의 경우 영문명을 입력해 주세요.</p>
                                <p>• 2명 이상 예약 조회는 <a className={styles['highlight']} a href="/ViewOnOffReservationList">여기</a>를 클릭해 주세요</p>
                            </div>
                            
                            <div className={styles['compact-search-wrapper']}>
                                <button className={styles['compact-search-btn']}>
                                    예약 조회
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 운항 조회 */}
                {activeTab === '운항 조회' && (
                    <>
                        <div className={styles['compact-sub-tabs']}>
                            <button 
                                className={`${styles['compact-sub-tab']} ${activeSubTab === '운항 스케줄' ? styles['active'] : styles['inactive']}`}
                                onClick={() => setActiveSubTab('운항 스케줄')}
                            >
                                운항 스케줄
                            </button>
                            <button 
                                className={`${styles['compact-sub-tab']} ${activeSubTab === '출도착 현황' ? styles['active'] : styles['inactive']}`}
                                onClick={() => setActiveSubTab('출도착 현황')}
                            >
                                출도착 현황
                            </button>
                        </div>
                        <div className={styles['compact-trip-type']}>
                            <span className={styles['active']}>
                                {activeSubTab === '운항 스케줄' ? '왕복' : '구간조회'}
                            </span>
                            <span className={styles['inactive']}>
                                {activeSubTab === '운항 스케줄' ? '편도' : '편명조회'}
                            </span>
                        </div>

                        {/* 출발지/도착지, 날짜, 조회버튼을 같은 줄에 배치 */}
                        <div className={styles['ticketing-main-row']}>
                            {/* 왼쪽: 출발지/도착지 */}
                            <div className={styles['ticketing-target']}>
                                <button 
                                    type="button" 
                                    className={`${styles['start-button']} ${styles['active']}`}
                                    onClick={() => onOpenModal({ type: 'departure' })}
                                >
                                    <span className={styles['txt']}>서울(김포)</span>
                                </button>
                                <button type="button" className={styles['btn-exchange']}>
                                    <span className={styles['exchange-icon']}></span>
                                </button>
                                <button 
                                    type="button" 
                                    className={styles['target-button']}
                                    onClick={() => onOpenModal({ type: 'arrival' })}
                                >
                                    <span className={`${styles['txt']} ${styles['before-select']}`}>도착지</span>
                                </button>
                            </div>
                            
                            {/* 오른쪽: 날짜와 조회버튼 */}
                            <div className={styles['ticketing-right-group']}>
                                <div className={styles['ticketing-date']}>
                                    <button 
                                        type="button" 
                                        className={styles['btn-date']}
                                        onClick={() => onOpenDateModal({ type: 'departure' })}
                                    >
                                        <Calendar className={styles['compact-icon']} />
                                        <span className={styles['txt']}>2025.09.24(수) ~ 2025.10.01(수)</span>
                                    </button>
                                </div>
                                <div className={styles['compact-search-wrapper']}>
                                    <button className={styles['compact-search-btn']}>
                                        조회
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default FlightSearch;