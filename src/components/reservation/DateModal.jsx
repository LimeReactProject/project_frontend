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

 // ...existing code...

// ...existing code...

useEffect(() => {
    const fetchPriceData = async () => {
        console.log('Props 확인:', { 
            departure, 
            arrival, 
            departureCode, 
            arrivalCode,
            isOpen 
        });
        
        if (!departureCode || !arrivalCode || 
            departureCode === 'undefined' || arrivalCode === 'undefined' ||
            departureCode.trim() === '' || arrivalCode.trim() === '') {
            console.log('출발지 또는 도착지 코드가 유효하지 않음');
            setPriceData({});
            return;
        }
        
        setLoading(true);
        try {
            // 전체 데이터 범위에서 실제 스케줄이 있는 날짜들을 조회
            const priceMap = {};
            const dataStartDate = new Date(2025, 8, 30); // 9월 30일
            const dataEndDate = new Date(2025, 9, 12);   // 10월 12일
            const currentDate = new Date(dataStartDate);
            
            console.log(`${departureCode} → ${arrivalCode} 스케줄 조회 시작`);
            
            // 각 날짜별로 실제 스케줄이 있는지 확인
            const datePromises = [];
            while (currentDate <= dataEndDate) {
                const dateString = toYMDLocal(currentDate);
                datePromises.push(
                    apiClient.get("/schedule-details", { 
                        params: {
                            departure: departureCode,
                            arrival: arrivalCode,
                            date: dateString
                        }
                    }).then(response => ({
                        date: dateString,
                        data: response.data
                    })).catch(error => ({
                        date: dateString,
                        data: null,
                        error: error
                    }))
                );
                currentDate.setDate(currentDate.getDate() + 1);
            }
            
            // 모든 날짜 조회 완료 후 처리
            const results = await Promise.all(datePromises);
            
            results.forEach(result => {
                const { date, data, error } = result;
                
                if (error) {
                    console.log(`${date}: API 호출 실패`);
                    return;
                }
                
                if (data && Array.isArray(data) && data.length > 0) {
                    // 스케줄이 있는 날짜 - 가격 정보 추출
                    const firstItem = data[0];
                    let price = null;
                    
                    const priceFields = ['price', 'totalFare', 'total_fare', 'fare', 'cost', 'amount'];
                    for (const field of priceFields) {
                        if (firstItem[field] != null) {
                            price = firstItem[field];
                            break;
                        }
                    }
                    
                    if (price !== null) {
                        priceMap[date] = price;
                        console.log(`${date}: 스케줄 있음, 가격 ${price}원 (${data.length}편)`);
                    } else {
                        console.log(`${date}: 스케줄 있지만 가격 정보 없음`);
                    }
                } else {
                    console.log(`${date}: 스케줄 없음`);
                }
            });
            
            console.log('최종 가격 데이터:', priceMap);
            console.log(`총 ${Object.keys(priceMap).length}개 날짜에 스케줄 존재`);
            setPriceData(priceMap);
            
        } catch (error) {
            console.error('스케줄 조회 중 전체 실패:', error);
            setPriceData({});
        } finally {
            setLoading(false);
        }
    };

    if (isOpen && departureCode && arrivalCode) {
        fetchPriceData();
    }
}, [isOpen, departureCode, arrivalCode]);


            // 가격 조회 함수
const getPriceForDate = (date) => {
    const dateString = toYMDLocal(date);
    return priceData[dateString] || null;
};


    const formatPrice = (price) => {
        return price !== null && price !== undefined ? price.toLocaleString() : '';
    };

    const isWeekend = (date) => {
        const day = date.getDay();
        return day === 0 || day === 6; // 일요일(0) 또는 토요일(6)
    };

// 비활성화 조건에 데이터 범위 추가
const isDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // 데이터가 있는 범위
    const dataStartDate = new Date(2025, 8, 30);
    const dataEndDate = new Date(2025, 9, 12);
    
    // 과거 날짜이거나 데이터 범위를 벗어나면 비활성화
    if (date < today || date < dataStartDate || date > dataEndDate) {
        return true;
    }
    
    // 현재 달이나 다음 달이 아니면 비활성화
    if (date.getMonth() !== currentMonth.getMonth() && 
        date.getMonth() !== nextMonth.getMonth()) {
        return true;
    }
    
    // 실제 스케줄(가격 데이터)이 없으면 비활성화
    const dateString = toYMDLocal(date);
    return !priceData[dateString];
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
                    const res = await apiClient.get('/schedule-details',
                         { params: {
                                        date: q,
                                        departure: departureCode,
                                        arrival: arrivalCode,
                                    } }); 
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

  // 캘린더 렌더링에서 데이터 없는 날짜 표시 개선
const renderCalendar = (monthDate) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDate = new Date(startDate);

    // 데이터 범위
    const dataStartDate = new Date(2025, 8, 30);
    const dataEndDate = new Date(2025, 9, 12);

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
        
        // 데이터 범위 내 여부 확인
        const inDataRange = date >= dataStartDate && date <= dataEndDate;
        const hasSchedule = price !== null && price !== undefined;
        
        if (!isCurrentMonth) {
            days.push(
                <div key={i} className="calendar-day empty-day">
                    {/* 빈 칸 */}
                </div>
            );
        } else {
            days.push(
                <div
                    key={i}
                    className={`calendar-day 
                        ${disabled ? 'disabled' : ''} 
                        ${selected ? 'selected' : ''} 
                        ${weekend ? 'weekend' : ''} 
                        ${inRange ? 'in-range' : ''} 
                        ${isStart ? 'start-date' : ''} 
                        ${isEnd ? 'end-date' : ''}
                        ${inDataRange && !hasSchedule ? 'no-data' : ''}`}
                    onClick={() => handleDateClick(date)}
                >
                    <div className="day-number">{date.getDate()}</div>
                    {hasSchedule && (
                        <div className="day-price">{formatPrice(price)}</div>
                    )}
                    {inDataRange && !hasSchedule && (
                        <div className="day-price no-flight">운항없음</div>
                    )}
                </div>
            );
        }
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
