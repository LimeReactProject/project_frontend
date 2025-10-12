import React, { useState } from 'react';
import './Payment.css';
import Header from '../../common/Header';
import Footer from '../../common/Footer';

const Payment = ({ bookingData, onBack, onPaymentComplete }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('toss');

  const handlePayment = () => {
    // 실제 토스페이 결제 로직 구현
    console.log('토스페이 결제 진행:', bookingData);
    
    // 임시로 결제 완료 처리
    setTimeout(() => {
      onPaymentComplete({
        ...bookingData,
        paymentMethod: 'toss',
        paymentStatus: 'completed',
        paymentTime: new Date().toISOString()
      });
    }, 2000);
  };

  const formatPrice = (price) => {
    if (typeof price === 'string') {
      return price;
    }
    return price?.toLocaleString() + '원' || '0원';
  };

  const getTotalAmount = () => {
    const flightPrice = parseInt(bookingData.price?.replace(/[^0-9]/g, '') || '0');
    const seatPrice = bookingData.selectedSeat ? 
      (bookingData.selectedSeat.type === 'bizlite' ? 10000 : 5000) : 0;
    return flightPrice + seatPrice;
  };

  return (
    <React.Fragment>
    <Header />
    <main className="payment-main">
      <div className="payment-container">
        <div className="payment-header">
          <button className="back-btn" onClick={onBack}>
            ← 이전으로
          </button>
          <h2>결제하기</h2>
        </div>

        {/* ✅ 확인 및 동의 섹션 추가 */}
        <div className="confirmation-card">
          <h3>확인 및 동의</h3>
          
          {/* ✅ 여정 상세 - 티켓 스타일 */}
          <div className="journey-details">
            <div className="journey-header">
              <h4>여정 상세</h4>
              <div className="passenger-info">
                <span className="passenger-icon">👤</span>
                <span>1</span>
                <span className="passenger-icon">👶</span>
                <span>0</span>
                <span className="passenger-icon">👧</span>
                <span>0</span>
              </div>
            </div>
            
            {/* ✅ 티켓 형태 */}
            <div className="flight-ticket">
              <div className="ticket-left">
                <div className="flight-code">{bookingData.flightCode}</div>
                <div className="flight-class">{bookingData.className}</div>
              </div>
              
              <div className="ticket-right">
                <div className="flight-route">
                  <div className="departure-section">
                    <div className="time">
                      {bookingData.time?.split(' - ')[0] || '16:25'}
                    </div>
                    <div className="date">
                      {bookingData.date || '2025.11.17(월)'}
                    </div>
                    <div className="city">{bookingData.departure}</div>
                  </div>
                  
                  <div className="route-arrow">
                    <div className="arrow-line"></div>
                    <span>→</span>
                  </div>
                  
                  <div className="arrival-section">
                    <div className="time">
                      {bookingData.time?.split(' - ')[1] || '17:30'}
                    </div>
                    <div className="date">
                      {bookingData.date || '2025.11.17(월)'}
                    </div>
                    <div className="city">{bookingData.arrival}</div>
                  </div>
                </div>
              </div>
              
              {/* ✅ 티켓 구멍 효과 */}
              <div className="ticket-perforations">
                <div className="perforation"></div>
                <div className="perforation"></div>
                <div className="perforation"></div>
                <div className="perforation"></div>
                <div className="perforation"></div>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ 항공편 운임 상세 */}
        <div className="fare-details-card">
          <div className="fare-summary">
            <h3>항목별 운임 상세</h3>
            
            {/* ✅ 항공 운송료 섹션 */}
            <div className="fare-section">
              <h4>항공 운송료</h4>
              <div className="fare-items">
                <div className="fare-item">
                  <span>항공요금</span>
                  <span>{Math.floor(getTotalAmount() * 0.7).toLocaleString()}원</span>
                </div>
                <div className="fare-item">
                  <span>유류할증료</span>
                  <span>{Math.floor(getTotalAmount() * 0.2).toLocaleString()}원</span>
                </div>
                <div className="fare-item">
                  <span>공항시설 사용료</span>
                  <span>4,000원</span>
                </div>
                <div className="fare-item">
                  <span>운항보험</span>
                  <span>-</span>
                </div>
              </div>
            </div>

            {/* ✅ 할인 섹션 */}
            <div className="fare-section">
              <h4>할인</h4>
              <div className="discount-item">
                <span style={{ color: '#ff6b6b' }}>미적용</span>
              </div>
            </div>

            {/* ✅ 부가서비스 섹션 */}
            <div className="fare-section">
              <h4>부가서비스</h4>
              <div className="fare-items">
                <div className="fare-item">
                  <span>좌석 선택</span>
                  <span>{bookingData.selectedSeat ? 
                    (bookingData.selectedSeat.type === 'bizlite' ? '5,000원' : '5,000원') : '5,000원'
                  }</span>
                </div>
              </div>
            </div>

            {/* ✅ 총 결제금액 */}
            <div className="total-fare">
              <div className="total-line">
                <span>예상 결제금액</span>
                <span className="total-amount">
                  {getTotalAmount().toLocaleString()}원 &gt;
                </span>
              </div>
            </div>
          </div>
        </div>
          {/* 결제방법 선택 */}
          <div className="payment-method-card">
            <h3>결제방법</h3>
            
            <div className="payment-options">
                <div 
                className={`payment-option ${selectedPaymentMethod === 'toss' ? 'selected' : ''}`}
                onClick={() => setSelectedPaymentMethod('toss')}
                >
                <input 
                    type="radio" 
                    name="payment" 
                    value="toss" 
                    checked={selectedPaymentMethod === 'toss'}
                    onChange={() => setSelectedPaymentMethod('toss')}
                />
                <span>토스페이 결제</span>
                </div>

                <div 
                className={`payment-option disabled ${selectedPaymentMethod === 'card' ? 'selected' : ''}`}
                >
                <input 
                    type="radio" 
                    name="payment" 
                    value="card" 
                    checked={selectedPaymentMethod === 'card'}
                    disabled
                />
                <span>신용결제</span>
                </div>
            </div>
            </div>


          {/* 결제 버튼 */}
          <div className="payment-action">
            <button 
              className="payment-btn toss-pay"
              onClick={handlePayment}
            >
              <div className="toss-pay-logo">toss</div>
              <span>토스페이 최대 {getTotalAmount().toLocaleString()}원 결제하기</span>
            </button>
          </div>

          {/* 유의사항 */}
          <div className="payment-notice">
            <ul>
              <li>구매하신 항공료에 따라 자동으로 적립이 진행됩니다.</li>
              <li>기타 승객정보를 클릭하여 실제로 탑승할 승객의 정보를 입력해주시기 바랍니다.</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Payment;