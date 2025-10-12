import React, { useState } from 'react';
import './SeatSelection.css';
import Header from '../../common/Header';
import Footer from '../../common/Footer';

const SeatSelection = ({ flightData, onBack, onConfirm }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);

  // ✅ 전체 좌석 데이터 - 4개 좌석 모두 표시
  const allSeats = [
    { id: 'B01', row: 1, column: 'A', type: 'bizlite', available: true },
    { id: 'B02', row: 1, column: 'B', type: 'bizlite', available: true },
    { id: 'S01', row: 2, column: 'A', type: 'standard', available: true },
    { id: 'S02', row: 2, column: 'B', type: 'standard', available: true }
  ];

  // ✅ 선택 가능한 좌석 필터링
  const getSelectableSeats = () => {
    return allSeats.map(seat => ({
      ...seat,
      selectable: seat.type === flightData.classType
    }));
  };

  const selectableSeats = getSelectableSeats();

  // ✅ 비즈니스 클래스와 일반석 좌석 분리
  const bizliteSeats = selectableSeats.filter(seat => seat.type === 'bizlite');
  const standardSeats = selectableSeats.filter(seat => seat.type === 'standard');

  const handleSeatClick = (seat) => {
    if (seat.available && seat.selectable) {
      setSelectedSeat(seat);
    }
  };

  const handleConfirm = () => {
    if (selectedSeat && onConfirm) {
      onConfirm({
        ...flightData,
        selectedSeat
      });
    }
  };
  

  const getSeatPrice = (seatType) => {
    return seatType === 'bizlite' ? 10000 : 5000;
  };

  return (
    <React.Fragment>
      <Header />
      <main className="seat-selection-main">
        <div className="seat-selection-container">
          <div className="selection-header">
            <button className="back-btn" onClick={onBack}>
              ← 이전으로
            </button>
            <h2>좌석 선택</h2>
          </div>

          <div className="flight-info-card">
            <div className="flight-details">
              <h3>{flightData.flightCode}</h3>
              <div className="route-info">
                <span>{flightData.departure} → {flightData.arrival}</span>
                <span>{flightData.date}</span>
                <span>{flightData.time}</span>
              </div>
              <div className="class-info">
                <span className="selected-class">{flightData.className}</span>
                <span className="class-price">{flightData.price}원</span>
              </div>
            </div>
          </div>

          <div className="seat-map-container">
            <div className="seat-legend">
              <div className="legend-item">
                <div className="legend-seat available"></div>
                <span>선택 가능</span>
              </div>
              <div className="legend-item">
                <div className="legend-seat selected"></div>
                <span>선택됨</span>
              </div>
              <div className="legend-item">
                <div className="legend-seat disabled"></div>
                <span>선택 불가</span>
              </div>
              <div className="legend-item">
                <div className="legend-seat occupied"></div>
                <span>다른 클래스</span>
              </div>
            </div>

            <div className="aircraft-container">
              <div className="aircraft-nose"></div>
              
              <div className="seat-map">
                {/* ✅ 비즈니스 클래스 섹션 */}
                <div className="seat-section bizlite-section">
                  <h4>비즈니스 클래스</h4>
                  
                  <div className="seat-grid">
                    <div className="seat-row">
                      <div className="row-number">1</div>
                      <div className="seat-columns-header">
                        <div className="column-header">A</div>
                        <div className="column-header">B</div>
                      </div>
                    </div>
                    
                    <div className="seat-row">
                      <div className="row-spacer"></div>
                      <div className="seats">
                        {bizliteSeats.map((seat) => (
                          <div
                            key={seat.id}
                            className={`seat ${
                              selectedSeat?.id === seat.id ? 'selected' : 
                              seat.selectable ? 'available' : 'occupied'
                            }`}
                            onClick={() => handleSeatClick(seat)}
                            title={seat.selectable ? '선택 가능' : '다른 클래스 좌석'}
                          >
                            {seat.id}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ✅ 통로 */}
                <div className="aisle">
                  <div className="aisle-line"></div>
                </div>

                {/* ✅ 일반석 섹션 */}
                <div className="seat-section standard-section">
                  <h4>일반석</h4>
                  
                  <div className="seat-grid">
                    <div className="seat-row">
                      <div className="row-number">2</div>
                      <div className="seat-columns-header">
                        <div className="column-header">A</div>
                        <div className="column-header">B</div>
                      </div>
                    </div>
                    
                    <div className="seat-row">
                      <div className="row-spacer"></div>
                      <div className="seats">
                        {standardSeats.map((seat) => (
                          <div
                            key={seat.id}
                            className={`seat ${
                              selectedSeat?.id === seat.id ? 'selected' : 
                              seat.selectable ? 'available' : 'occupied'
                            }`}
                            onClick={() => handleSeatClick(seat)}
                            title={seat.selectable ? '선택 가능' : '다른 클래스 좌석'}
                          >
                            {seat.id}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="aircraft-tail"></div>
            </div>

            {/* ✅ 선택한 클래스 안내 */}
            <div className="class-notice">
              <p>
                <strong>{flightData.classType === 'bizlite' ? '비즈니스 클래스' : '일반석'}</strong> 
                티켓으로 선택 가능한 좌석만 예약할 수 있습니다.
              </p>
            </div>
          </div>

          {selectedSeat && (
            <div className="seat-selection-summary">
              <div className="selected-seat-info">
                <h3>선택된 좌석</h3>
                <div className="seat-details">
                  <span className="seat-number">{selectedSeat.id}</span>
                  <span className="seat-type">
                    {selectedSeat.type === 'bizlite' ? '비즈니스 클래스' : '일반석'}
                  </span>
                  <span className="seat-price">
                    +{getSeatPrice(selectedSeat.type).toLocaleString()}원
                  </span>
                </div>
              </div>

              <div className="total-summary">
                <div className="price-breakdown">
                  <div className="price-line">
                    <span>항공료</span>
                    <span>{flightData.price}원</span>
                  </div>
                  <div className="price-line">
                    <span>좌석 선택료</span>
                    <span>+{getSeatPrice(selectedSeat.type).toLocaleString()}원</span>
                  </div>
                  <div className="price-line total">
                    <span>총 결제금액</span>
                    <span>
                      {(parseInt(flightData.price.replace(/[^0-9]/g, '')) + getSeatPrice(selectedSeat.type)).toLocaleString()}원
                    </span>
                  </div>
                </div>

                <button 
                  className="confirm-selection-btn"
                  onClick={handleConfirm}
                >
                  좌석 선택 완료
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default SeatSelection;