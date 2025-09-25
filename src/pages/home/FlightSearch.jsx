import React, { useState } from 'react';
import './FlightSearch.css';
import { Calendar, Users, ChevronDown } from 'lucide-react';

function FlightSearch({ onOpenModal, onOpenDateModal }) {
    const [tripType, setTripType] = useState('왕복');
    const [activeTab, setActiveTab] = useState('항공권 예매');
    const [activeSubTab, setActiveSubTab] = useState('운항 스케줄');

    return (
        <div className="flight-overlay-container">
            {/* 탭 메뉴 - 박스 위쪽에 배치 */}
            <div className="compact-tabs">
                <button
                    className={`compact-tab ${activeTab === '항공권 예매' ? 'active' : 'inactive'}`}
                    onClick={() => setActiveTab('항공권 예매')}
                >
                    항공권 예매
                </button>
                <button
                    className={`compact-tab ${activeTab === '예약 조회' ? 'active' : 'inactive'}`}
                    onClick={() => setActiveTab('예약 조회')}
                >
                    예약 조회
                </button>
                <button
                    className={`compact-tab ${activeTab === '운항 조회' ? 'active' : 'inactive'}`}
                    onClick={() => setActiveTab('운항 조회')}
                >
                    운항 조회
                </button>
            </div>
            
            <div className="compact-form-card">
                {/* 항공권 예매 */}
                {activeTab === '항공권 예매' && (
                    <>
                        <div className="compact-trip-type">
                            <span 
                                className={tripType === '왕복' ? 'active' : 'inactive'}
                                onClick={() => setTripType('왕복')}
                            >
                                왕복
                            </span>
                            <span 
                                className={tripType === '편도' ? 'active' : 'inactive'}
                                onClick={() => setTripType('편도')}
                            >
                                편도
                            </span>
                        </div>

                        {/* 출발지/도착지와 날짜/성인을 같은 줄에 배치 */}
                        <div className="ticketing-main-row">
                            {/* 왼쪽: 출발지/도착지 */}
                            <div className="ticketing-target">
                                <button 
                                    type="button" 
                                    className="start-button active" 
                                    onClick={() => onOpenModal({ type: 'departure' })}
                                >
                                    <span className="txt">서울(김포)</span>
                                </button>
                                {/* 왕복일 때만 교환 버튼 표시 */}
                                {tripType === '왕복' && (
                                    <button type="button" className="btn-exchange">
                                        <span className="exchange-icon"></span>
                                    </button>
                                )}
                                <button 
                                    type="button" 
                                    className="target-button" 
                                    onClick={() => onOpenModal({ type: 'arrival' })}
                                >
                                    <span className="txt before-select">도착지</span>
                                </button>
                            </div>
                            
                            {/* 오른쪽: 날짜/성인 */}
                            <div className="ticketing-right-group">
                                <div className="ticketing-date">
                                    <button 
                                        type="button" 
                                        className="btn-date"
                                        onClick={() => onOpenDateModal({ type: 'departure' })}
                                    >
                                        <Calendar className="compact-icon" />
                                        <span className="txt">
                                            {tripType === '왕복' 
                                                ? '2025.09.24(수) ~ 2025.10.01(수)' 
                                                : '2025.09.24(수)'
                                            }
                                        </span>
                                    </button>
                                </div>
                                <div className="ticketing-passenger">
                                    <button type="button" className="btn-passenger">
                                        <Users className="compact-icon" />
                                        <span className="txt">성인 1</span>
                                        <ChevronDown className="compact-icon" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 검색버튼 */}
                        <div className="compact-search-wrapper">
                            <button className="compact-search-btn">
                                항공권 검색
                            </button>
                        </div>
                    </>
                )}

                {/* 예약 조회 */}
                {activeTab === '예약 조회' && (
                    <div className="compact-reservation-form">
                        {/* 2x2 그리드 레이아웃 */}
                        <div className="reservation-form-grid">
                            <div className="reservation-form-group">
                                <label>예약번호</label>
                                <button type="button" className="reservation-input-btn">
                                    <span className="txt">예약번호를 입력하세요</span>
                                </button>
                            </div>
                            <div className="reservation-form-group">
                                <label>탑승일자</label>
                                <button type="button" className="reservation-input-btn">
                                    <Calendar className="compact-icon" />
                                    <span className="txt">YYYY.MM.DD</span>
                                </button>
                            </div>
                            <div className="reservation-form-group">
                                <label>성</label>
                                <button type="button" className="reservation-input-btn">
                                    <span className="txt">성을 입력하세요</span>
                                </button>
                            </div>
                            <div className="reservation-form-group">
                                <label>이름</label>
                                <button type="button" className="reservation-input-btn">
                                    <span className="txt">이름을 입력하세요</span>
                                </button>
                            </div>
                        </div>
                        
                        {/* 안내 문구와 예약 조회 버튼을 같은 줄에 배치 */}
                        <div className="reservation-bottom-row">
                            <div className="compact-info-text">
                                <p>• 여행사, 공항, 고객센터, 비회원 예약 고객님도 조회 가능합니다.</p>
                                <p>• 예약시 입력한 탑승객명을 입력해 주세요.</p>
                                <p>• 국제선의 경우 영문명을 입력해 주세요.</p>
                                <p>• 2명 이상 예약 조회는 <span className="highlight">여기</span>를 클릭해 주세요</p>
                            </div>
                            
                            <div className="compact-search-wrapper">
                                <button className="compact-search-btn">
                                    예약 조회
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 운항 조회 */}
                {activeTab === '운항 조회' && (
                    <>
                        <div className="compact-sub-tabs">
                            <button 
                                className={`compact-sub-tab ${activeSubTab === '운항 스케줄' ? 'active' : 'inactive'}`}
                                onClick={() => setActiveSubTab('운항 스케줄')}
                            >
                                운항 스케줄
                            </button>
                            <button 
                                className={`compact-sub-tab ${activeSubTab === '출도착 현황' ? 'active' : 'inactive'}`}
                                onClick={() => setActiveSubTab('출도착 현황')}
                            >
                                출도착 현황
                            </button>
                        </div>
                        <div className="compact-trip-type">
                            <span className="active">
                                {activeSubTab === '운항 스케줄' ? '왕복' : '구간조회'}
                            </span>
                            <span className="inactive">
                                {activeSubTab === '운항 스케줄' ? '편도' : '편명조회'}
                            </span>
                        </div>

                        {/* 출발지/도착지, 날짜, 조회버튼을 같은 줄에 배치 */}
                        <div className="ticketing-main-row">
                            {/* 왼쪽: 출발지/도착지 */}
                            <div className="ticketing-target">
                                <button 
                                    type="button" 
                                    className="start-button active"
                                    onClick={() => onOpenModal({ type: 'departure' })}
                                >
                                    <span className="txt">서울(김포)</span>
                                </button>
                                <button type="button" className="btn-exchange">
                                    <span className="exchange-icon"></span>
                                </button>
                                <button 
                                    type="button" 
                                    className="target-button"
                                    onClick={() => onOpenModal({ type: 'arrival' })}
                                >
                                    <span className="txt before-select">도착지</span>
                                </button>
                            </div>
                            
                            {/* 오른쪽: 날짜와 조회버튼 */}
                            <div className="ticketing-right-group">
                                <div className="ticketing-date">
                                    <button 
                                        type="button" 
                                        className="btn-date"
                                        onClick={() => onOpenDateModal({ type: 'departure' })}
                                    >
                                        <Calendar className="compact-icon" />
                                        <span className="txt">2025.09.24(수) ~ 2025.10.01(수)</span>
                                    </button>
                                </div>
                                <div className="compact-search-wrapper">
                                    <button className="compact-search-btn">
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