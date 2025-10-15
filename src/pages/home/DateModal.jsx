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

function DateModal({ isOpen, onClose, modalType, onSelectDate, searchType, allowPastDates = false }) {
    const [selectedDeparture, setSelectedDeparture] = useState(null);
    const [selectedReturn, setSelectedReturn] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 8)); // 2025년 9월 (0-based)
    const [nextMonth, setNextMonth] = useState(new Date(2025, 9)); // 2025년 10월
    const [loading, setLoading] = useState(false);

   


   

    const isWeekend = (date) => {
        const day = date.getDay();
        return day === 0 || day === 6; // 일요일(0) 또는 토요일(6)
    };

    const isDisabled = (date) => {
        // allowPastDates가 true이면 지나간 날짜도 선택 가능 (월만 체크)
        if (allowPastDates) {
            // 오직 현재 표시된 월이 아닌 날짜만 비활성화
            return date.getMonth() !== currentMonth.getMonth() && date.getMonth() !== nextMonth.getMonth();
        }
        
        // 기본적으로는 오늘 이전 날짜는 비활성화
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today || (date.getMonth() !== currentMonth.getMonth() && date.getMonth() !== nextMonth.getMonth());
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

    const handleSelect = () => {
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
            // 편도일 때: 선택된 날짜만 전달
            const selectedDate = modalType === 'departure' ? selectedDeparture : selectedReturn;
            if (selectedDate) {
                console.log(`Selected ${modalType} date:`, selectedDate);
                if (onSelectDate) {
                    onSelectDate(selectedDate, modalType);
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
            const disabled = isDisabled(date);
            const selected = isSelected(date);
            const weekend = isWeekend(date);
            const isCurrentMonth = date.getMonth() === month;
            const inRange = isInRange(date);
            const isStart = isStartDate(date);
            const isEnd = isEndDate(date);

            days.push(
                <div
                    key={i}
                    className={`calendar-day ${disabled ? 'disabled' : ''} ${selected ? 'selected' : ''} ${weekend ? 'weekend' : ''} ${!isCurrentMonth ? 'other-month' : ''} ${inRange ? 'in-range' : ''} ${isStart ? 'start-date' : ''} ${isEnd ? 'end-date' : ''}`}
                    onClick={() => handleDateClick(date)}
                >
                    <div className="day-number">{date.getDate()}</div>
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
                        <button className="modal-close" onClick={onClose}>
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <div className="modal-info">
                    {/* 가격 정보 제거 */}
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
