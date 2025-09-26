import React, { useState } from 'react';
import '../../css/home/DateModal.css';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

function DateModal({ isOpen, onClose, modalType }) {
    const [selectedDeparture, setSelectedDeparture] = useState(null);
    const [selectedReturn, setSelectedReturn] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 8)); // 2025년 9월 (0-based)
    const [nextMonth, setNextMonth] = useState(new Date(2025, 9)); // 2025년 10월

    // 샘플 가격 데이터 (실제로는 API에서 가져올 데이터)
    const getPriceForDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth();
        
        // 9월 데이터
        if (month === 8) { // 9월
            const prices = {
                25: 38600, 26: 48600, 27: 74600, 28: 60600, 29: 62600, 30: 41600
            };
            return prices[day] || null;
        }
        
        // 10월 데이터
        if (month === 9) { // 10월
            const prices = {
                1: 31600, 2: 40600, 3: 97700, 4: 80600, 5: 45600, 6: 38600, 7: 41600,
                8: 48600, 9: 55600, 10: 62600, 11: 69600, 12: 45600, 13: 38600, 14: 41600,
                15: 48600, 16: 55600, 17: 62600, 18: 69600, 19: 45600, 20: 38600, 21: 41600,
                22: 48600, 23: 55600, 24: 62600, 25: 69600, 26: 45600, 27: 38600, 28: 41600,
                29: 48600, 30: 55600, 31: 62600
            };
            return prices[day] || null;
        }
        
        return null;
    };

    const formatPrice = (price) => {
        return price ? price.toLocaleString() : '';
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
        if (modalType === 'departure') {
            return selectedDeparture && date.getTime() === selectedDeparture.getTime();
        } else {
            return selectedReturn && date.getTime() === selectedReturn.getTime();
        }
    };

    const handleDateClick = (date) => {
        if (isDisabled(date)) return;
        
        if (modalType === 'departure') {
            setSelectedDeparture(date);
        } else {
            setSelectedReturn(date);
        }
    };

    const handleSelect = () => {
        const selectedDate = modalType === 'departure' ? selectedDeparture : selectedReturn;
        if (selectedDate) {
            console.log(`Selected ${modalType} date:`, selectedDate);
            onClose();
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

            days.push(
                <div
                    key={i}
                    className={`calendar-day ${disabled ? 'disabled' : ''} ${selected ? 'selected' : ''} ${weekend ? 'weekend' : ''} ${!isCurrentMonth ? 'other-month' : ''}`}
                    onClick={() => handleDateClick(date)}
                >
                    <div className="day-number">{date.getDate()}</div>
                    {price && (
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
                    <h2>언제 떠나세요?</h2>
                    <div className="header-right">
                        <span className="currency-info">통화 : 원</span>
                        <button className="modal-close" onClick={onClose}>
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <div className="modal-info">
                    <span className="price-info">① 1인 편도 총액 기준</span>
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
                        <span className="selection-label">가는 편 |</span>
                        <span className="arrow">→</span>
                        <span className="selection-label">오는 편 |</span>
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
