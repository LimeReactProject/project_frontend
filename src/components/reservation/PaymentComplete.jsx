import React, { useState, useEffect } from 'react';
import './PaymentComplete.css';
import Header from '../../common/Header';
import Footer from '../../common/Footer';

const PaymentComplete = ({ bookingData, onGoHome, onViewReservation }) => {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actualBookingData, setActualBookingData] = useState(bookingData);
  const [status, setStatus] = useState('confirming');
  const didRun = React.useRef(false);

  useEffect(() => {
    if (didRun.current) return;   // ✅ 두 번째 호출 차단
    didRun.current = true;

    const url = new URL(window.location.href);
    const isMock = url.searchParams.get('mock') === '1';
    const paymentKey = url.searchParams.get('paymentKey'); // mock이면 없어도 OK
    const orderIdFromUrl = url.searchParams.get('orderId');
    const amountParam = url.searchParams.get('amount');
    const paymentType = url.searchParams.get('paymentType');

    // 1) 저장 복구: localStorage → sessionStorage → completedBookingData → URL 최소정보(mock 한정)
    let savedPayload = null;
    const l1 = localStorage.getItem('paymentConfirmPayload');
    const l2 = sessionStorage.getItem('paymentConfirmPayload');
    if (l1) savedPayload = JSON.parse(l1);
    else if (l2) savedPayload = JSON.parse(l2);
    else {
      const completed = localStorage.getItem('completedBookingData');
      if (completed) savedPayload = JSON.parse(completed);
    }

     // 2) 마운트 간 중복 방지 키 (orderId 기반)
    const execKey =
      'pc_ran_' + (orderIdFromUrl || savedPayload?.orderId || 'mock');
    if (sessionStorage.getItem(execKey)) {
      // 이미 처리한 페이지 재실행 방지
      setLoading(false);
      return;
    }
    sessionStorage.setItem(execKey, '1');

    if (!savedPayload && isMock) {
      // 마지막 폴백: URL에서 최소 정보만 구성
      savedPayload = {
        orderId: orderIdFromUrl ?? `ORDER_${Date.now()}`,
        amount: Number(amountParam) || 0,
        bookingSnapshot: {},
      };
    }
    if (!savedPayload) {
      setLoading(false);
      setStatus('fail');
      return;
    }

    // 2) (선택) orderId 일치 검증 — mock일 땐 완화
    if (!isMock && savedPayload.orderId !== orderIdFromUrl) {
      setLoading(false);
      alert('주문번호가 일치하지 않습니다.');
      return;
    }

    // 3) mock이면 서버 승인 생략 → 로컬 데이터로 완료 처리
if (isMock) {
  const orderId = savedPayload.orderId ?? orderIdFromUrl ?? `ORDER_${Date.now()}`;
  const amountNum = Number.isFinite(savedPayload.amount)
    ? savedPayload.amount
    : Number(amountParam);

  // 좌석번호 보정
  const snap = savedPayload.bookingSnapshot || {};
  const sel = snap.selectedSeat || savedPayload.selectedSeat || {};
  const seatNumber = sel.seatNumber || sel.id || `${sel.row ?? ''}${sel.column ?? ''}`;

  // 결제표시 데이터
  setPaymentDetails({
    paymentKey: paymentKey ?? '(mock)',
    orderId,
    amount: Number.isFinite(amountNum) ? amountNum : 0,
    paymentDate: new Date().toLocaleDateString('ko-KR'),
    paymentTime: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
  });

  // 화면에 보여줄 예약 데이터
  const completed = {
    ...savedPayload,
    flightCode:  snap.flightCode  ?? savedPayload.flightCode  ?? bookingData?.flightCode,
    className:   snap.className   ?? savedPayload.className   ?? bookingData?.className,
    time:        snap.time        ?? savedPayload.time        ?? bookingData?.time,
    date:        snap.date        ?? savedPayload.date        ?? bookingData?.date,
    departure:   snap.departure   ?? savedPayload.departure   ?? bookingData?.departure,
    arrival:     snap.arrival     ?? savedPayload.arrival     ?? bookingData?.arrival,
    price:       snap.price       ?? savedPayload.price       ?? bookingData?.price,
  selectedSeat:
    (sel && (sel.seatNumber || sel.id || sel.row != null || sel.column != null))
      ? {
          ...sel,
          seatNumber,                        // 우선순위 seatNumber 확정
          seatId: sel.seatId ?? sel.id,      // DB용 seatId도 확실히 세팅
        }
      : bookingData?.selectedSeat,
  };

  localStorage.setItem('completedBookingData', JSON.stringify(completed));
  setActualBookingData(completed);   // ⬅️ 바로 "이 다음 줄"에 서버 저장 호출을 붙입니다.
const API_BASE = 'http://localhost:8080';

  // ⬇️ DB 저장을 위한 mock 호출 (여기에 붙이세요)

  const snapSel = completed?.selectedSeat || {};
  const seatIdForSave =
    snapSel.seatId || snapSel.id || savedPayload.seatId || null;
    const reservNumForSave =
      savedPayload.reservNum || completed.reservNum || `JA${Date.now()}`;

  fetch(`${API_BASE}/api/payments/confirm`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        // ⬇️ state 대신 이미 계산해둔 지역 변수 사용
         paymentKey: paymentKey ?? '(mock)',
          orderId,
          amount: Number.isFinite(amountNum) ? amountNum : 0,
          paymentType,
          reservNum: reservNumForSave,
          optNum: savedPayload.optNum,            // ★ 이제 절대 null 아님
          scheduleNum: savedPayload.scheduleNum,  // ★ 이제 절대 null 아님
          memberNum: savedPayload.memberNum,      // null이면 백에서 게스트번호 발급
          seatId: seatIdForSave,
    }),
  })
    .then(() => {
      // 저장 성공 시 화면에 예약번호 반영
      setActualBookingData(prev => ({ ...prev, reservNum: reservNumForSave }));
    })
    .catch((e) => {
      console.error('CLIENT-ONLY SAVE ERROR:', e);
      // mock이므로 화면은 계속 성공 유지
    });

  // 이후 화면 상태 마무리
  setStatus('success');
  localStorage.removeItem('paymentConfirmPayload');
  sessionStorage.removeItem('paymentConfirmPayload');
  setLoading(false);
  return; // 서버 호출 O, Toss 승인 X
}


    // 4) mock이 아니면 실제 승인 흐름 (시크릿키 필요)
    if (!paymentKey || !orderIdFromUrl || !amountParam) {
      setLoading(false);
      alert('결제 결과 파라미터가 유효하지 않습니다.');
      return;
    }

    const body = {
      paymentKey,
      orderId: orderIdFromUrl,
      amount: Number(amountParam),
      paymentType,
      reservNum: savedPayload.reservNum,
      optNum: savedPayload.optNum,
      scheduleNum: savedPayload.scheduleNum,
      memberNum: savedPayload.memberNum,
      seatId: savedPayload.seatId,
    };

    const API_BASE = 'http://localhost:8080';
    fetch(`${API_BASE}/api/payments/confirm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then((r) => {
        if (!r.ok) throw new Error('서버 승인 실패');
        return r.json();
      })
      .then((resp) => {
        setStatus('success');
        setPaymentDetails({
          paymentKey,
          orderId: orderIdFromUrl,
          amount: Number(amountParam),
          paymentDate: new Date().toLocaleDateString('ko-KR'),
          paymentTime: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        });
        setActualBookingData(resp.reservationDetails);
        const completed = {
          ...savedPayload,
          flightCode: resp?.reservationDetails?.flightCode ?? bookingData?.flightCode,
          className: resp?.reservationDetails?.className ?? bookingData?.className,
          time: resp?.reservationDetails?.time ?? bookingData?.time,
          date: resp?.reservationDetails?.date ?? bookingData?.date,
          departure: resp?.reservationDetails?.departure ?? bookingData?.departure,
          arrival: resp?.reservationDetails?.arrival ?? bookingData?.arrival,
          price: resp?.reservationDetails?.price ?? bookingData?.price,
          selectedSeat: resp?.reservationDetails?.selectedSeat ?? bookingData?.selectedSeat,
        };
        localStorage.setItem('completedBookingData', JSON.stringify(completed));
        setActualBookingData(completed);
        localStorage.removeItem('paymentConfirmPayload');
        sessionStorage.removeItem('paymentConfirmPayload');
      })
      .catch((e) => {
        console.error(e);
        alert('결제 승인 처리 중 오류가 발생했습니다. 잠시 후 재시도 버튼을 눌러주세요.');
        setStatus('fail');
      })
      .finally(() => setLoading(false));
  }, []);

  const formatPrice = (price) => {
    if (typeof price === 'string') {
      return price;
    }
    return (price?.toLocaleString?.() || '0') + '원';
  };

  const getTotalAmount = () => {
    if (paymentDetails) {
      return paymentDetails.amount;
    }
    const flightPrice = parseInt(actualBookingData?.price?.replace(/[^0-9]/g, '') || '0', 10);
    const seatPrice = actualBookingData?.selectedSeat
      ? (actualBookingData.selectedSeat.type === 'bizlite' ? 10000 : 5000)
      : 0;
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
              <div className="success-icon" style={{ background: 'transparent' }}>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="32" fill="#ef4444" />
                  <path d="M32 18v22M32 46v2" stroke="white" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
              <h1>결제 승인에 실패했어요</h1>
              <p className="completion-message">
                결제는 완료되었지만, 내부 승인 처리 중 오류가 발생했습니다.
                <br />
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
                <span className="number">{actualBookingData?.reservNum || '서버에서 발급받은 번호'}</span>
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
                  <span>
                    {paymentDetails?.paymentDate || new Date().toLocaleDateString('ko-KR')}{' '}
                    {paymentDetails?.paymentTime || new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
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
