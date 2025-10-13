import React, { useState, useEffect } from 'react';
import './PaymentComplete.css';
import Header from '../../common/Header';
import Footer from '../../common/Footer';

const PaymentComplete = ({ bookingData, onGoHome, onViewReservation }) => {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actualBookingData, setActualBookingData] = useState(bookingData); // ✅ 추가
  const [status, setStatus] = useState('confirming');

  
 useEffect(() => {
   // 1) URL 쿼리 파싱
   const url = new URL(window.location.href);
   const paymentKey  = url.searchParams.get('paymentKey');
   const orderIdFromUrl = url.searchParams.get('orderId');
  const amountParam = url.searchParams.get('amount');
   const paymentType = url.searchParams.get('paymentType');

   if (!paymentKey || !orderIdFromUrl || !amountParam) {
     setLoading(false);
     return alert('결제 결과 파라미터가 유효하지 않습니다.');
   }

   // 2) 결제 직전에 저장한 예약/좌석 정보 로드
   const saved = localStorage.getItem('paymentConfirmPayload');
   if (!saved) {
     setLoading(false);
     return alert('예약 정보가 없습니다. 다시 시도해주세요.');
   }
   const savedPayload = JSON.parse(saved);

   // (선택) orderId 일치 검증
   if (savedPayload.orderId !== orderIdFromUrl) {
     setLoading(false);
     return alert('주문번호가 일치하지 않습니다.');
   }

  // 3) 서버로 Toss Confirm + DB 저장 요청
   const body = {
     paymentKey,
     orderId: orderIdFromUrl,
     amount: Number(amountParam),
     paymentType,
     reservNum:   savedPayload.reservNum,
     optNum:      savedPayload.optNum,
    scheduleNum: savedPayload.scheduleNum,
     memberNum:   savedPayload.memberNum,
     seatId:      savedPayload.seatId
   };
const API_BASE = 'http://localhost:8080';

   fetch(`${API_BASE}/api/payments/confirm`, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(body)
   })
   .then(r => {
     if (!r.ok) throw new Error('서버 승인 실패');
     return r.json();
   })
   .then((resp) => {
     // 화면 표시용 데이터 구성
     setStatus('success');
     setPaymentDetails({
       paymentKey,
       orderId: orderIdFromUrl,
       amount: Number(amountParam),
       paymentDate: new Date().toLocaleDateString('ko-KR'),
       paymentTime: new Date().toLocaleTimeString('ko-KR', {hour:'2-digit',minute:'2-digit'})
     });

    // 선택한 항공편/좌석 보여주기용 bookingData도 세팅
     const completed = {
       ...savedPayload,
       // UI에서 쓰는 필드들 (Payment.jsx의 bookingData 구조에 맞춰 보강)
       flightCode:  actualBookingData?.flightCode ?? bookingData?.flightCode,
       className:   actualBookingData?.className  ?? bookingData?.className,
       time:        actualBookingData?.time       ?? bookingData?.time,
       date:        actualBookingData?.date       ?? bookingData?.date,
       departure:   actualBookingData?.departure  ?? bookingData?.departure,
       arrival:     actualBookingData?.arrival    ?? bookingData?.arrival,
       price:       actualBookingData?.price      ?? bookingData?.price,
       selectedSeat: actualBookingData?.selectedSeat ?? bookingData?.selectedSeat,
     };
     localStorage.setItem('completedBookingData', JSON.stringify(completed));
     setActualBookingData(completed);

     // 이미 사용한 payload는 제거
     localStorage.removeItem('paymentConfirmPayload');
   })
   .catch((e) => {
     console.error(e);
     alert('결제 승인 처리 중 오류가 발생했습니다.');
     setStatus('fail');

   })
   .finally(() => setLoading(false));
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);


  const formatPrice = (price) => {
    if (typeof price === 'string') {
      return price;
    }
    return price?.toLocaleString() + '원' || '0원';
  };

const getTotalAmount = () => {
  if (paymentDetails) {
    return paymentDetails.amount;
  }
  const flightPrice = parseInt(actualBookingData?.price?.replace(/[^0-9]/g, '') || '0');
  const seatPrice = actualBookingData?.selectedSeat ? 
    (actualBookingData.selectedSeat.type === 'bizlite' ? 10000 : 5000) : 0;
  return flightPrice + seatPrice;
};


  const generateReservationNumber = () => {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `JA${dateStr}${randomNum}`;
  };

  if (loading) {
    return (
      <React.Fragment>
        <Header />
        <main className="payment-complete-main">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>결제 결과를 확인하고 있습니다...</p>
          </div>
        </main>
        <Footer />
      </React.Fragment>
    );
  }

 if (status === 'fail') {
   return (
     <>
       <Header />
       <main className="payment-complete-main">
         <div className="payment-complete-container">
           <div className="completion-header">
            <div className="success-icon" style={{background:'transparent'}}>
               {/* 간단한 경고 아이콘 */}
               <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                 <circle cx="32" cy="32" r="32" fill="#ef4444"/>
                 <path d="M32 18v22M32 46v2" stroke="white" strokeWidth="4" strokeLinecap="round"/>
               </svg>
             </div>
             <h1>결제 승인에 실패했어요</h1>
             <p className="completion-message">
               결제는 완료되었지만, 내부 승인 처리 중 오류가 발생했습니다.<br/>
               잠시 후 다시 시도하거나 고객센터로 문의해주세요.
             </p>
           </div>
           <div className="action-buttons">
             <button className="btn-secondary" onClick={() => window.location.replace('/')}>
               홈으로 이동
             </button>
             <button className="btn-primary" onClick={() => window.location.reload()}>
               승인 재시도
             </button>
           </div>
         </div>
       </main>
       <Footer />
     </>
   );
 }
  return (
    <React.Fragment>
      <Header />
      <main className="payment-complete-main">
        <div className="payment-complete-container">
          <div className="completion-header">
            <div className="success-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="32" fill="#22c55e" />
                <path d="M20 32l8 8 16-16" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1>결제가 완료되었습니다!</h1>
            <p className="completion-message">
              예약이 성공적으로 처리되었습니다.
              <br />
              예약번호를 확인해주세요.
            </p>
          </div>

 {/* 예약 정보 */}
          <div className="reservation-info-card">
            <div className="reservation-header">
              <h3>예약 정보</h3>
              <div className="reservation-number">
                <span className="label">예약번호</span>
                <span className="number">{generateReservationNumber()}</span>
              </div>
            </div>

            {/* 항공편 정보 */}
            <div className="flight-info-section">
              <h4>항공편 정보</h4>
              <div className="flight-ticket-complete">
                <div className="ticket-left-complete">
                    <div className="flight-code">{actualBookingData?.flightCode || 'JA101'}</div>
                     <div className="flight-class">{actualBookingData?.className || '스탠다드'}</div>
                </div>
                
                <div className="ticket-right-complete">
                  <div className="flight-route-complete">
                    <div className="departure-section-complete">
                    <div className="time">
                        {actualBookingData?.time?.split(' - ')[0] || '16:25'}
                    </div>
                    <div className="date">
                        {actualBookingData?.date || '2025.11.17(월)'}
                    </div>
                    <div className="city">{actualBookingData?.departure || '제주'}</div>
                    </div>

                    
                    <div className="route-arrow-complete">
                      <div className="arrow-line-complete"></div>
                      <span>→</span>
                    </div>
                    
                    <div className="arrival-section-complete">
                    <div className="time">
                        {actualBookingData?.time?.split(' - ')[1] || '17:30'}
                    </div>
                    <div className="date">
                        {actualBookingData?.date || '2025.11.17(월)'}
                    </div>
                    <div className="city">{actualBookingData?.arrival || '김포'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 승객 정보 */}
            <div className="passenger-info-section">
              <h4>승객 정보</h4>
              <div className="passenger-details">
                <div className="passenger-item">
                  <span className="passenger-type">성인</span>
                  <span className="passenger-count">1명</span>
                </div>
                {actualBookingData?.selectedSeat && (
                  <div className="seat-info">
                    <span>좌석: {actualBookingData.selectedSeat.seatNumber || '자동배정'}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 결제 정보 카드 */}
          <div className="payment-info-card">
            <h3>결제 정보</h3>
            
            <div className="payment-summary">
              <div className="payment-method-info">
                <span className="label">결제 방법</span>
                <div className="toss-pay-info">
                  <span className="toss-logo-small">toss</span>
                  <span>토스페이</span>
                </div>
              </div>
              
              <div className="payment-details">
                <div className="payment-detail-item">
                  <span>결제 일시</span>
                  <span>{paymentDetails?.paymentDate || new Date().toLocaleDateString('ko-KR')} {paymentDetails?.paymentTime || new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="payment-detail-item">
                  <span>주문번호</span>
                  <span>{paymentDetails?.orderId || 'ORDER_' + Date.now()}</span>
                </div>
                <div className="payment-detail-item total-amount-row">
                  <span>결제 금액</span>
                  <span className="total-amount-complete">
                    {getTotalAmount().toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 요금 상세 내역 */}
          <div className="fare-breakdown-card">
            <h3>요금 상세 내역</h3>
            
            <div className="breakdown-section">
              <h4>항공 운송료</h4>
              <div className="breakdown-items">
                <div className="breakdown-item">
                  <span>항공요금</span>
                  <span>{Math.floor(getTotalAmount() * 0.7).toLocaleString()}원</span>
                </div>
                <div className="breakdown-item">
                  <span>유류할증료</span>
                  <span>{Math.floor(getTotalAmount() * 0.2).toLocaleString()}원</span>
                </div>
                <div className="breakdown-item">
                  <span>공항시설 사용료</span>
                  <span>4,000원</span>
                </div>
              </div>
            </div>

            {actualBookingData?.selectedSeat && (
              <div className="breakdown-section">
                <h4>부가서비스</h4>
                <div className="breakdown-items">
                  <div className="breakdown-item">
                    <span>좌석 선택</span>
                    <span>{actualBookingData.selectedSeat.type === 'bizlite' ? '10,000원' : '5,000원'}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="breakdown-total">
              <div className="breakdown-item total">
                <span>총 결제 금액</span>
                <span>{getTotalAmount().toLocaleString()}원</span>
              </div>
            </div>
          </div>

          {/* 액션 버튼들 */}
          <div className="action-buttons">
            <button className="btn-secondary" onClick={onGoHome}>
              홈으로 이동
            </button>
            <button className="btn-primary" onClick={onViewReservation}>
              예약 관리
            </button>
          </div>

          {/* 안내사항 */}
          <div className="completion-notice">
            <h4>안내사항</h4>
            <ul>
              <li>예약번호는 체크인 및 예약 조회 시 필요하니 안전하게 보관해주세요.</li>
              <li>출발 2시간 전까지 온라인 체크인을 완료해주세요.</li>
              <li>예약 변경 및 취소는 항공편 출발 3시간 전까지 가능합니다.</li>
              <li>예약 관련 문의사항은 고객센터(1588-2828)로 연락주세요.</li>
            </ul>
          </div>

        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default PaymentComplete;