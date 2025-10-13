import React, { useEffect, useState, useMemo } from "react";
import "./Payment.css";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";

const Payment = ({ bookingData, onBack, onPaymentComplete }) => {
  const [paymentWidget, setPaymentWidget] = useState/** @type {PaymentWidgetInstance | null} */(null);
  const [paymentMethodWidget, setPaymentMethodWidget] = useState(null);

  // 🔐 테스트 클라이언트 키 & 고객 키 (데모용)
  const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";
  // customerKey는 가급적 회원 고유값을 사용하세요. (비회원이면 랜덤 생성)
  const customerKey = useMemo(() => {
    // 예: 로그인 사용자라면 userId 등으로 대체
    return "demo-user-12345";
  }, []);

  const TEST_MODE = true;
  const TEST_AMOUNT = 100;

  const formatPrice = (price) => (typeof price === "string" ? price : (price ?? 0).toLocaleString() + "원");

  const getTotalAmount = () => {
    const flightPrice = parseInt(bookingData.price?.replace(/[^0-9]/g, "") || "0", 10);
    const seatPrice = bookingData.selectedSeat
      ? (bookingData.selectedSeat.type === "bizlite" ? 10000 : 5000)
      : 0;
    return flightPrice + seatPrice;
  };

  // ✅ 성공 페이지에서 서버 승인용 데이터 복원할 수 있게 저장
  const persistBookingForConfirm = (booking, orderId, amount) => {
    const payload = {
      reservNum:   booking.reservNum,
      optNum:      booking.optNum,
      scheduleNum: booking.scheduleNum,
      memberNum:   booking.memberNum,
      seatId:      booking.selectedSeat?.seatId ?? null,
      orderId,
      amount,
    };
    localStorage.setItem("paymentConfirmPayload", JSON.stringify(payload));
  };

  // ✅ toss 위젯 로드 & 렌더
  useEffect(() => {
    let mounted = true;

    (async () => {
      // 1) 위젯 로드
      const widget = await loadPaymentWidget(clientKey, customerKey);


      setPaymentWidget(widget);

      // 2) 결제수단 영역 렌더 (할인수단 위젯은 렌더하지 않음)
      const methodWidget = await widget.renderPaymentMethods(
        "#payment-method",
        { value: TEST_MODE ? TEST_AMOUNT : getTotalAmount() },
        {
          variantKey: "DEFAULT",
          // 필요시 특정 수단만 보이고 싶다면(예: 카드만)
          // selectablePaymentMethods: ["CARD"],
        }
      );
      setPaymentMethodWidget(methodWidget);

      // 3) 약관 동의 영역 렌더
      await widget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });

      // ⚠️ 중요: "할인/쿠폰/포인트" 등은 별도 위젯을 렌더해야 나타납니다.
      // 아래처럼 아무것도 렌더하지 않으면 화면에 "할인수단" 섹션이 안 나옵니다.
      // 예) renderXxxPromotion / renderCoupons / renderPoint 같은 걸 호출하지 마세요.
    })();

    return () => {
      mounted = false;
    };
  }, [clientKey, customerKey]);

  // 금액 변동 시 UI 금액 갱신
  useEffect(() => {
    if (paymentMethodWidget) {
      paymentMethodWidget.updateAmount(TEST_MODE ? TEST_AMOUNT : getTotalAmount());
    }
  }, [paymentMethodWidget, bookingData]);

  // ✅ 결제 버튼
  const handlePayment = async () => {
    if (!paymentWidget) {
      alert("결제 시스템을 준비 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    // 주문번호 임의 생성(실서비스는 서버에서 생성 권장)
    const orderId = btoa(Math.random().toString()).slice(0, 20);
    const amount = TEST_MODE ? TEST_AMOUNT : getTotalAmount();

    // 성공 페이지에서 서버 승인(또는 데모 처리)용 데이터 저장
    persistBookingForConfirm(bookingData, orderId, amount);

    try {
      await paymentWidget.requestPayment({
        orderId,
        orderName: `${bookingData.flightCode} 항공편 (${bookingData.departure} → ${bookingData.arrival})`,
        amount, // ← SDK v2에서는 명시적으로 amount 넣어도 됩니다 (위젯 금액과 동일하게)
        // 고객정보
        customerEmail: "customer@example.com",
        customerName: "김승객",
        customerMobilePhone: "01012345678",
        // 콜백 URL
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (error) {
      console.error("[requestPayment] error:", error);
      if (error?.code === "USER_CANCEL") {
        alert("결제가 취소되었습니다.");
      } else {
        alert("결제 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
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
                  {getTotalAmount().toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
        </div>
         {/* ✅ 토스페이먼츠 결제방법 섹션만 유지 */}
      <div className="payment-method-card">
        
        {/* ✅ 토스페이먼츠 결제 UI가 렌더링될 영역 */}
        <div id="payment-method"></div>
        
        {/* ✅ 이용약관 동의 UI가 렌더링될 영역 */}
        <div id="agreement"></div>

        {/* ✅ 기존 결제방법 선택 UI 완전 제거 */}
      </div>

      {/* ✅ 토스페이 결제 버튼만 유지 */}
      <div className="payment-action">
        <button 
          className="payment-btn toss-pay"
          onClick={handlePayment}
        >
          <div className="toss-pay-logo">toss</div>
 <span>{(TEST_MODE ? TEST_AMOUNT : getTotalAmount()).toLocaleString()}원 결제하기</span>
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