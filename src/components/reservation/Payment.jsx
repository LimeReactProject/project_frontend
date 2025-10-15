import React, { useEffect, useState, useMemo,useRef,useCallback  } from "react";
import "./Payment.css";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";

/**
 * v2 통일 포인트
 * - loadPaymentWidget(clientKey, customerKey) 그대로 사용 (비회원은 ANONYMOUS)
 * - renderPaymentMethods / renderAgreement / requestPayment v2 시그니처 사용
 * - 금액 변경은 paymentMethodsWidget.updateAmount(amount)
 * - orderId는 crypto.randomUUID()로 유니크하게 생성
 */
const Payment = ({ bookingData, onBack, onPaymentComplete }) => {
  const [isReady, setIsReady] = useState(false);
  const [initAttempts, setInitAttempts] = useState(0); // ✅ 초기화 시도 횟수 추적
  const widgetRef = useRef(null);
  const methodsRef = useRef(null);

  const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm"; // ✅ 위젯용 gck(문서 데모 키)
  const customerKey = useMemo(() => ANONYMOUS, []);

  const didInitRef = useRef(false);
  const STUDY_MOCK = true;  //테스트 환경에서 할것

  const FRONT_ORIGIN = "http://localhost:5173"; // 프론트 개발 주소로 고정

  const TEST_MODE = true;
  const TEST_AMOUNT = 100;
const optNumByClassName = (className) => {
  switch (className) {
    case '스탠다드': return '4';
    case '비즈라이트': return '5';
    // 필요하면 PLUS들도 매핑
    case '수하물 PLUS+': return '1';
    case '수하물 좌석 PLUS+': return '2';
    case '프리미엄 PLUS+': return '3';
    default: return '4'; // 기본값
  }
};

  const getTotalAmount = () => {
    const flightPrice = parseInt(bookingData?.price?.replace(/[^0-9]/g, "") || "0", 10);
    const seatPrice = bookingData?.selectedSeat
      ? (bookingData.selectedSeat.type === "bizlite" ? 10000 : 5000)
      : 0;
    return flightPrice + seatPrice;
  };

  // ✅ 프레임 2번 대기 유틸 (유지)
  const waitTwoFrames = useCallback(() =>
      new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve))
      ), []);

  // ✅ 컨테이너 가시성 체크 (유지)
  const containersAreVisible = useCallback(() => {
    const methodEl = document.querySelector("#payment-method");
    const agreeEl = document.querySelector("#agreement");
    if (!methodEl || !agreeEl) return false;
    const m = getComputedStyle(methodEl);
    const a = getComputedStyle(agreeEl);
    const visible = (el, cs) =>
        cs.display !== "none" && cs.visibility !== "hidden" && el.offsetParent !== null;
    return visible(methodEl, m) && visible(agreeEl, a);
  }, []);
  
  // ✅ 결제 위젯 초기화 로직 분리 (재시도 용이)
  const initializePaymentWidget = useCallback(async (clientKey, customerKey) => {
    // 0) 가시성 경고 로그 (유지)
    if (!containersAreVisible()) {
        console.warn(
            "[Toss] payment containers are hidden at init. " +
            "Ensure #payment-method and #agreement are visible."
        );
        // ✅ 가시성 문제라면 초기화 시도 자체를 중단하고 에러 발생
        throw new Error("결제 UI 컨테이너가 숨겨져 있습니다. DOM 가시성을 확보해주세요.");
    }
    
    // 1) 위젯 로드 (유지)
    const widget = await loadPaymentWidget(clientKey, customerKey);
    widgetRef.current = widget;

    // 2) 결제수단 렌더 (유지)
    const amount = TEST_MODE ? TEST_AMOUNT : getTotalAmount();
    const methods = await widget.renderPaymentMethods(
        "#payment-method",
        { value: amount },
        { variantKey: "DEFAULT" }
    );
    methodsRef.current = methods;

    // 3) 약관 렌더 (유지)
    await widget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });

    // 4) 프레임 2번 대기 후 ready (유지)
    await waitTwoFrames();
    
    // ✅ 모든 과정 성공 시 반환
    return true;

  }, [clientKey, customerKey, TEST_MODE, TEST_AMOUNT, getTotalAmount, containersAreVisible, waitTwoFrames]);

  
  useEffect(() => {
    let cancelled = false;

    // 초기화 함수
    const init = async () => {
      if (cancelled) return;
      if (didInitRef.current) return; // 이미 한 번 성공한 초기화가 있으면 재진입 금지

      console.log(`[Toss] Attempting widget initialization. Attempt #${initAttempts + 1}`);
      setIsReady(false);
      
      try {
        await initializePaymentWidget(clientKey, customerKey);
        if (cancelled) return;
        didInitRef.current = true;


        setIsReady(true);
        console.log("[Toss] Widget initialized successfully.");
      } catch (e) {
        if (cancelled) return;
        
        console.error("Toss widget init error:", e);
        // ✅ 오류 발생 시 시도 횟수를 증가시키고 잠시 후 재시도
        if (initAttempts < 3) {
            console.log("Toss widget init failed, retrying in 1 second...");
            setTimeout(() => setInitAttempts(a => a + 1), 1000);
        } else {
            alert("결제 위젯 초기화에 실패했습니다. 페이지를 새로고침 해주세요.");
        }
      }
    };

    // ✅ isReady 상태가 false로 바뀌거나 initAttempts가 증가하면 초기화 재시도
    if (!isReady) {
        init();
    }
    
    return () => {
      cancelled = true;

      // setIsReady(false); // 재시도 로직을 위해 제거
    };
  }, [clientKey, customerKey, initAttempts, initializePaymentWidget, isReady]);

  // 금액 변경 (기존 로직 유지)
  useEffect(() => {
    if (!methodsRef.current) return;
    const nextAmount = TEST_MODE ? TEST_AMOUNT : getTotalAmount();
    console.log("[Toss] updateAmount ->", nextAmount);

    methodsRef.current.updateAmount(nextAmount);
  }, [bookingData, TEST_MODE, TEST_AMOUNT, getTotalAmount]);

 const persistBookingForConfirm = (booking, orderId, amount) => {
 // 1) SearchResults에서 넘어온 snake/camel을 최우선 사용
 let optNum = booking?.opt_num ?? booking?.optNum ?? null;

 // 2) 없으면 최후의 보루로 클래스+옵션명으로 정확 매핑
 if (!optNum) {
   const cls = booking?.classType === 'bizlite' ? '비즈라이트' : '스탠다드';
   const name = booking?.className; // '스탠다드' 또는 '수하물 PLUS+' 등
   const key =
     (name === '스탠다드' || name === '비즈라이트') ? name : `${cls}_${name}`;
   const MAP = {
     '스탠다드': '4',
     '비즈라이트': '5',
     '스탠다드_수하물 PLUS+': '1',
     '스탠다드_수하물 좌석 PLUS+': '2',
     '스탠다드_프리미엄 PLUS+': '3',
     '비즈라이트_수하물 PLUS+': '6',
     '비즈라이트_수하물 좌석 PLUS+': '7',
     '비즈라이트_프리미엄 PLUS+': '8',
   };
   optNum = MAP[key] ?? null;
 }

const optName = booking?.opt_name ?? booking?.optName ?? booking?.className ?? null; 


   const scheduleNum = booking?.scheduleNum || booking?.schedule_id || booking?.scheduleId; 
    
    // 2. template_id 추출 (template_id, templateId, templateNum 등 다양한 키값 체크)
    const templateId = booking?.template_id || booking?.templateId || booking?.templateNum; 

  const seatId =
    booking?.selectedSeat?.seatId ||
    booking?.selectedSeat?.id ||
    null;

  const selectedSeat =
    booking?.selectedSeat
      ? {
          ...booking.selectedSeat,
          seatNumber: booking.selectedSeat.seatNumber || booking.selectedSeat.id,
          seatId: String(seatId || booking.selectedSeat.seatId || ''),
        }
      : null;
    // --- ⭐️ 콘솔 로그 추가 ⭐️ ---
    console.log("--- [TOSS_PAYMENT] 예약 메타데이터 확인 ---");
    console.log(`1. bookingData Prop 전체:`, booking);
    console.log(`2. 추출된 scheduleNum (스케줄 번호):`, scheduleNum);
    console.log(`3. 추출된 template_id (템플릿 ID):`, templateId);
    console.log(`4. 생성된 orderId:`, orderId);
    console.log("-----------------------------------------");
    
  const payload = {
    reservNum: booking?.reservNum ?? null,
    optNum,                    
    optName,
    scheduleNum,               
    template_id: templateId, // <-- 백엔드로 전달될 템플릿 ID (template_id 오류 해결)
    memberNum: booking?.memberNum ?? null, // 비로그인일 경우 백에서 발급
    seatId: selectedSeat?.seatId ?? null,
    orderId,
    amount,
    orderName: `${booking?.flightCode ?? "항공편"} (${booking?.departure ?? ""} → ${booking?.arrival ?? ""})`,
    bookingSnapshot: {
      flightCode: booking?.flightCode,
      className: booking?.className,
      time: booking?.time,
      date: booking?.date,
      departure: booking?.departure,
      arrival: booking?.arrival,
      price: booking?.price,
      selectedSeat,
    },
  };

  localStorage.setItem("paymentConfirmPayload", JSON.stringify(payload));
  sessionStorage.setItem("paymentConfirmPayload", JSON.stringify(payload));
};
  // ✅ 결제 버튼 핸들러 (안정성 강화)
  const handlePayment = async () => {
  if (!widgetRef.current) {
    alert("결제 UI 초기화 정보가 없습니다. 새로고침 후 다시 시도해주세요.");
    return;
  }
    
    // 2. 최종 가시성 확인
    if (!containersAreVisible()) {
      alert("결제 영역이 보이지 않습니다. 탭/모달이 열려 있는지 확인해주세요. (VISIBILITY-FAIL)");
      return;
    }

    const orderId = window.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2, 22);
    const amount = TEST_MODE ? TEST_AMOUNT : getTotalAmount();
    persistBookingForConfirm(bookingData, orderId, amount);

    try {
      // 3. 결제 요청 직전에 한 번 더 위젯 유효성 검사 (안전 장치)
      if (!widgetRef.current || !widgetRef.current.requestPayment) {
          throw new Error("결제 위젯 객체가 유효하지 않습니다. 초기화 오류.");
      }
      
      await widgetRef.current.requestPayment({
        orderId,
        orderName: `${bookingData?.flightCode ?? "항공편"} (${bookingData?.departure ?? ""} → ${bookingData?.arrival ?? ""})`,
        amount,
        customerEmail: "customer@example.com",
        customerName: "김승객",
        customerMobilePhone: "01012345678",
        successUrl: `${FRONT_ORIGIN}/payment/success${STUDY_MOCK ? "?mock=1" : ""}`,
         failUrl: `${FRONT_ORIGIN}/payment/fail`,
      });
      onPaymentComplete?.({ orderId, amount });
    } catch (error) {
      console.error("[requestPayment] error:", error);
      
      const errorMessage = error?.message || "알 수 없는 에러가 발생했습니다.";

      if (errorMessage.includes("결제 UI가 아직 렌더링되지 않았습니다") || error?.code === "UNKNOWN_ERROR") {
          // ✅ 핵심 보강: 렌더링 오류일 경우 isReady를 false로 설정하여 위젯 재초기화를 유도합니다.
          setIsReady(false);
          alert(`결제 중 일시적 오류가 발생했습니다. (Error: UI Not Ready). 잠시 후 다시 시도해주세요.`);
      } else if (error?.code === "USER_CANCEL") {
        alert("결제가 취소되었습니다.");
      } else {
        alert(`결제 중 오류가 발생했습니다: ${errorMessage}. 잠시 후 다시 시도해주세요.`);
      }
    }
  };
  // 사용자가 선택한 스케줄 키를 정확히 들고 있어야 함 (예: 'SCH20251016-2')


  return (
    <React.Fragment>
      <Header />
      <main className="payment-main">
        <div className="payment-container">
          <div className="payment-header">
            <button className="back-btn" onClick={onBack}>← 이전으로</button>
            <h2>결제하기</h2>
          </div>

          {/* 확인 및 동의 섹션 */}
          <div className="confirmation-card">
            <h3>확인 및 동의</h3>

            {/* 여정 상세 - 티켓 스타일 */}
            <div className="journey-details">
              <div className="journey-header">
                <h4>여정 상세</h4>
                <div className="passenger-info">
                  <span className="passenger-icon">👤</span><span>1</span>
                  <span className="passenger-icon">👶</span><span>0</span>
                  <span className="passenger-icon">👧</span><span>0</span>
                </div>
              </div>

              {/* 티켓 */}
              <div className="flight-ticket">
                <div className="ticket-left">
                  <div className="flight-code">{bookingData?.flightCode}</div>
                  <div className="flight-class">{bookingData?.className}</div>
                </div>

                <div className="ticket-right">
                  <div className="flight-route">
                    <div className="departure-section">
                      <div className="time">
                        {bookingData?.time?.split(" - ")[0] || "16:25"}
                      </div>
                      <div className="date">{bookingData?.date || "2025.11.17(월)"}</div>
                      <div className="city">{bookingData?.departure}</div>
                    </div>

                    <div className="route-arrow">
                      <div className="arrow-line"></div>
                      <span>→</span>
                    </div>

                    <div className="arrival-section">
                      <div className="time">
                        {bookingData?.time?.split(" - ")[1] || "17:30"}
                      </div>
                      <div className="date">{bookingData?.date || "2025.11.17(월)"}</div>
                      <div className="city">{bookingData?.arrival}</div>
                    </div>
                  </div>
                </div>

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

          {/* 운임 상세 */}
          <div className="fare-details-card">
            <div className="fare-summary">
              <h3>항목별 운임 상세</h3>

              <div className="fare-section">
                <h4>항공 운송료</h4>
                <div className="fare-items">
                  <div className="fare-item">
                    <span>항공요금</span>
                    <span>{Math.floor((TEST_MODE ? TEST_AMOUNT : getTotalAmount()) * 0.7).toLocaleString()}원</span>
                  </div>
                  <div className="fare-item">
                    <span>유류할증료</span>
                    <span>{Math.floor((TEST_MODE ? TEST_AMOUNT : getTotalAmount()) * 0.2).toLocaleString()}원</span>
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

              <div className="fare-section">
                <h4>할인</h4>
                <div className="discount-item">
                  <span style={{ color: "#ff6b6b" }}>미적용</span>
                </div>
              </div>

              <div className="fare-section">
                <h4>부가서비스</h4>
                <div className="fare-items">
                  <div className="fare-item">
                    <span>좌석 선택</span>
                    <span>
                      {bookingData?.selectedSeat
                        ? (bookingData.selectedSeat.type === "bizlite" ? "5,000원" : "5,000원")
                        : "5,000원"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="total-fare">
                <div className="total-line">
                  <span>예상 결제금액</span>
                  <span className="total-amount">
                    {(TEST_MODE ? TEST_AMOUNT : getTotalAmount()).toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 토스페이먼츠 결제 영역 (v2) */}
          <div className="payment-method-card">
            {/* ✅ 초기화 실패 시 메시지 */}
            {initAttempts >= 3 && !isReady ? (
              <div style={{ padding: '20px', border: '1px solid #ff6b6b', color: '#ff6b6b' }}>
                  ⚠️ 결제 위젯 로드에 실패했습니다. 새로고침 해주세요.
              </div>
            ) : (
              <>
                <div id="payment-method" />
                <div id="agreement" />
              </>
            )}
          </div>

          <div className="payment-action">
            <button
              type="button"
              className="payment-btn toss-pay"
              onClick={handlePayment}
              disabled={!isReady} // ✅ 렌더 완료 전 비활성화
              aria-busy={!isReady}
            >
              <div className="toss-pay-logo">toss</div>
              <span>
                {isReady ? 
                  `${(TEST_MODE ? TEST_AMOUNT : getTotalAmount()).toLocaleString()}원 결제하기` : 
                  '결제 UI 준비 중...'}
              </span>
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
