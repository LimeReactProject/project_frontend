import React, { useState, useEffect } from 'react';
import '../../css/home/DateModal.css';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { apiClient } from '../../apis/FlightInfoApi';

// 로컬 기준 "YYYY-MM-DD"로 포맷하는 유틸 함수
const toYMDLocal = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
};

function DateModal({ isOpen, onClose, modalType, onSelectDate, departure, arrival, departureCode, arrivalCode, searchType }) {
    const [selectedDeparture, setSelectedDeparture] = useState(null);
    const [selectedReturn, setSelectedReturn] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 8)); // 2025년 9월 (0-based)
    const [nextMonth, setNextMonth] = useState(new Date(2025, 9)); // 2025년 10월
    const [priceData, setPriceData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log('useEffect 실행됨 - departure:', departure, 'arrival:', arrival, 'departureCode:', departureCode, 'arrivalCode:', arrivalCode, 'currentMonth:', currentMonth);
        const fetchPriceData = async () => {
            console.log('API 호출 시작 - departure:', departure, 'arrival:', arrival, 'departureCode:', departureCode, 'arrivalCode:', arrivalCode);
            
            if (!departure || !arrival) {
                console.log('departure 또는 arrival이 없어서 API 호출 안함');
                return;
            }
            
            setLoading(true);
            try {
                // 9월과 10월 데이터를 모두 가져옴
                const september = new Date(2025, 8, 1); // 2025년 9월
                const october = new Date(2025, 9, 1); // 2025년 10월
                
                const septemberDate = toYMDLocal(september);
                const octoberDate = toYMDLocal(october);
                
                console.log('API 요청 데이터:', { 
                    departure, 
                    arrival, 
                    departureCode, 
                    arrivalCode, 
                    date: octoberDate 
                });
                const response = await apiClient.get("/schedule-detail", { // ✅ 백엔드와 경로 통일(언더스코어)
                    params: {
                        departure: departureCode, // TAE
                        arrival: arrivalCode,     // CJU
                        date: octoberDate // 10월 데이터 요청 (실제 데이터가 있는 월)
                    }
                });
                
                console.log('API 응답 전체:', response);
                console.log('API 응답 데이터:', response.data);
                
                // API 응답 데이터를 날짜별 가격 객체로 변환
                const priceMap = {};
                
                if (response.data && Array.isArray(response.data)) {
                    // 배열 형태의 데이터
                    response.data.forEach(item => {
                        console.log('처리 중인 아이템:', item);
                        // flightDate를 날짜로, price 필드 사용 (price가 0이어도 표시)
                        if (item.flightDate && item.price !== null && item.price !== undefined) {
                            // 같은 날짜에 이미 가격이 있으면 덮어쓰지 않음 (첫 번째 가격 유지)
                            if (!priceMap[item.flightDate]) {
                                priceMap[item.flightDate] = item.price;
                                console.log(`날짜 ${item.flightDate}에 가격 ${item.price} 설정`);
                            } else {
                                console.log(`날짜 ${item.flightDate}는 이미 가격 ${priceMap[item.flightDate]}가 있음, ${item.price} 무시`);
                            }
                        }
                    });
                } else if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
                    // 객체 형태의 데이터
                    console.log('객체 형태의 데이터 처리');
                    Object.keys(response.data).forEach(key => {
                        if (response.data[key] && typeof response.data[key] === 'number') {
                            priceMap[key] = response.data[key];
                        }
                    });
                } else if (typeof response.data === 'number') {
                    // 단순 숫자 형태의 데이터 (현재 선택된 날짜의 가격)
                    console.log('단순 숫자 형태의 데이터:', response.data);
                    priceMap[dateString] = response.data;
                } else if (typeof response.data === 'string' && !isNaN(response.data)) {
                    // 문자열 숫자 형태의 데이터
                    console.log('문자열 숫자 형태의 데이터:', response.data);
                    priceMap[dateString] = parseInt(response.data);
                } else if (response.data === '' || response.data === null || response.data === undefined) {
                    // 빈 응답인 경우
                    console.log('빈 응답 데이터 - 가격 정보 없음');
                }
                
                console.log('최종 priceMap:', priceMap);
                setPriceData(priceMap);
                console.log('가격 데이터 로딩 성공:', priceMap);
            } catch (error) {
                console.error('날짜 데이터 로딩 실패:', error);
                console.error('에러 상세:', error.response?.data);
                setPriceData({});
            } finally {
                setLoading(false);
            }
        };

        fetchPriceData();
    }, [departure, arrival, currentMonth]);


    // 백엔드에서 받은 날짜별 가격 데이터 사용
    const getPriceForDate = (date) => {
        const dateString = toYMDLocal(date); // ✅ 로컬 기준 YYYY-MM-DD 형식
        const price = priceData[dateString] || null;
        
        // 디버깅용 로그 (가격이 있을 때만)
        if (price) {
            console.log(`날짜 ${dateString}의 가격:`, price);
        }
        
        return price;
    };

    const formatPrice = (price) => {
        return price !== null && price !== undefined ? price.toLocaleString() : '';
    };

    const isWeekend = (date) => {
        const day = date.getDay();
        return day === 0 || day === 6; // 일요일(0) 또는 토요일(6)
    };

    const isDisabled = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today || date.getMonth() !== currentMonth.getMonth() && date.getMonth() !== nextMonth.getMonth();
    };

    const isSelected = (date) => {
        if (searchType === '왕복') {
            // 왕복일 때: 출발일 또는 도착일이면 선택된 것으로 표시
            return (selectedDeparture && date.getTime() === selectedDeparture.getTime()) ||
                   (selectedReturn && date.getTime() === selectedReturn.getTime());
        } else {
            // 편도일 때: 기존 로직
            if (modalType === 'departure') {
                return selectedDeparture && date.getTime() === selectedDeparture.getTime();
            } else {
                return selectedReturn && date.getTime() === selectedReturn.getTime();
            }
        }
    };

    const isInRange = (date) => {
        if (searchType === '왕복' && selectedDeparture && selectedReturn) {
            return date > selectedDeparture && date < selectedReturn;
        }
        return false;
    };

    const isStartDate = (date) => {
        return selectedDeparture && date.getTime() === selectedDeparture.getTime();
    };

    const isEndDate = (date) => {
        return selectedReturn && date.getTime() === selectedReturn.getTime();
    };

    const handleDateClick = (date) => {
        if (isDisabled(date)) return;
        
        if (searchType === '왕복') {
            // 왕복일 때: 첫 번째 클릭이 출발일, 두 번째 클릭이 도착일
            if (!selectedDeparture) {
                // 출발일 선택
                setSelectedDeparture(date);
                setSelectedReturn(null); // 도착일 초기화
            } else if (!selectedReturn) {
                // 도착일 선택 (출발일보다 늦어야 함)
                if (date > selectedDeparture) {
                    setSelectedReturn(date);
                } else {
                    // 출발일보다 이른 날짜면 출발일을 새로 설정
                    setSelectedDeparture(date);
                    setSelectedReturn(null);
                }
            } else {
                // 이미 둘 다 선택된 상태면 새로 시작
                setSelectedDeparture(date);
                setSelectedReturn(null);
            }
        } else {
            // 편도일 때: 기존 로직
            if (modalType === 'departure') {
                setSelectedDeparture(date);
            } else {
                setSelectedReturn(date);
            }
        }
    };

    const handleSelect = async () => {
        if (searchType === '왕복') {
            // 왕복일 때: 출발일과 도착일을 모두 전달
            if (selectedDeparture) {
                onSelectDate(selectedDeparture, 'departure');
            }
            if (selectedReturn) {
                onSelectDate(selectedReturn, 'return');
            }
            onClose();
        } else {
            // 편도일 때: 기존 로직
            const selectedDate = modalType === 'departure' ? selectedDeparture : selectedReturn;
            if (selectedDate) {
                console.log(`Selected ${modalType} date:`, selectedDate);
                if (onSelectDate) {
                    onSelectDate(selectedDate, modalType);
                }

                // ✅ 선택된 날짜로 백엔드 호출 (오늘X, ISOX)
                const q = toYMDLocal(selectedDate);       // "YYYY-MM-DD"
                console.log('스케줄 조회 요청:', q);
                try {
                    const res = await apiClient.get('/schedule-detail', { params: { date: q } }); // ✅ 언더스코어
                    console.log('스케줄 조회 응답:', res.data);
                } catch (e) {
                    console.error('스케줄 조회 실패', e);
                }

                onClose();
            }
        }
    };

    const handleReset = () => {
        if (modalType === 'departure') {
            setSelectedDeparture(null);
        } else {
            setSelectedReturn(null);
        }
    };

    const renderCalendar = (monthDate) => {
        const year = monthDate.getFullYear();
        const month = monthDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const days = [];
        const currentDate = new Date(startDate);

        // 6주 * 7일 = 42일
        for (let i = 0; i < 42; i++) {
            const date = new Date(currentDate);
            const price = getPriceForDate(date);
            const disabled = isDisabled(date);
            const selected = isSelected(date);
            const weekend = isWeekend(date);
            const isCurrentMonth = date.getMonth() === month;
            const inRange = isInRange(date);
            const isStart = isStartDate(date);
            const isEnd = isEndDate(date);

            // 디버깅용 로그 (처음 몇 개만)
            if (i < 5) {
                console.log(`날짜 ${date.toISOString().split('T')[0]} - 가격:`, price, '현재월:', isCurrentMonth);
            }

            days.push(
                <div
                    key={i}
                    className={`calendar-day ${disabled ? 'disabled' : ''} ${selected ? 'selected' : ''} ${weekend ? 'weekend' : ''} ${!isCurrentMonth ? 'other-month' : ''} ${inRange ? 'in-range' : ''} ${isStart ? 'start-date' : ''} ${isEnd ? 'end-date' : ''}`}
                    onClick={() => handleDateClick(date)}
                >
                    <div className="day-number">{date.getDate()}</div>
                    {price !== null && price !== undefined && (
                        <div className="day-price">{formatPrice(price)}</div>
                    )}
                </div>
            );
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return days;
    };

    const monthNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>
                        {searchType === '왕복' 
                            ? '출발일과 도착일을 선택하세요'
                            : '언제 떠나세요?'
                        }
                    </h2>
                    <div className="header-right">
                        <span className="currency-info">통화 : 원</span>
                        <button className="modal-close" onClick={onClose}>
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <div className="modal-info">
                    <span className="price-info">① 1인 편도 총액 기준</span>
                    {loading && <span className="loading-info">가격 정보를 불러오는 중...</span>}
                </div>

                <div className="calendar-section">
                    <button className="nav-button nav-prev">
                        <ChevronLeft size={20} />
                    </button>
                    
                    <div className="calendars-container">
                        <div className="calendar">
                            <div className="calendar-header">
                                <h3>{currentMonth.getFullYear()}. {monthNames[currentMonth.getMonth()]}</h3>
                            </div>
                            <div className="calendar-weekdays">
                                <div className="weekday">일</div>
                                <div className="weekday">월</div>
                                <div className="weekday">화</div>
                                <div className="weekday">수</div>
                                <div className="weekday">목</div>
                                <div className="weekday">금</div>
                                <div className="weekday">토</div>
                            </div>
                            <div className="calendar-days">
                                {renderCalendar(currentMonth)}
                            </div>
                        </div>

                        <div className="calendar">
                            <div className="calendar-header">
                                <h3>{nextMonth.getFullYear()}. {monthNames[nextMonth.getMonth()]}</h3>
                            </div>
                            <div className="calendar-weekdays">
                                <div className="weekday">일</div>
                                <div className="weekday">월</div>
                                <div className="weekday">화</div>
                                <div className="weekday">수</div>
                                <div className="weekday">목</div>
                                <div className="weekday">금</div>
                                <div className="weekday">토</div>
                            </div>
                            <div className="calendar-days">
                                {renderCalendar(nextMonth)}
                            </div>
                        </div>
                    </div>

                    <button className="nav-button nav-next">
                        <ChevronRight size={20} />
                    </button>
                </div>

                <div className="selection-info">
                    <div className="selection-labels">
                        <span className="selection-label">
                            {searchType === '왕복' 
                                ? '가는 편 ~ 오는 편'
                                : '출발일'
                            }
                        </span>
                    </div>
                    <span className="price-note">(공항세 + 유류할증료 등 포함)</span>
                </div>

                <div className="modal-footer">
                    <button className="reset-button" onClick={handleReset}>
                        초기화
                    </button>
                    <button className="select-button" onClick={handleSelect}>
                        선택
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DateModal;
