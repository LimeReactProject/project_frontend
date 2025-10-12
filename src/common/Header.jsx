import '../css/common/Header.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 필요한 함수들 정의
const URL_LINK = {
  getI18Url: (url) => {
    // 실제 URL 처리 로직
    console.log('Navigating to:', url);
    return url;
  }
};

const sendGAAttrEvent = (event) => {
  // GA 이벤트 전송 로직
  console.log('GA Event:', event);
};

function Header() {

  const nav = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 컴포넌트 로드 시 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = () => {
      const user = sessionStorage.getItem("loginUser");
      setIsLoggedIn(!!user);
    };

    checkLoginStatus(); // 처음 실행
    window.addEventListener("storage", checkLoginStatus); // 로그인/로그아웃 감지

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  // 마이페이지 버튼 클릭 시 처리
  const handleMyPageClick = () => {
    if (isLoggedIn) {
      nav("/mypage");
    } else {
      nav("/login");
    }
  };

  // 로그아웃 처리 함수
  const handleLogout = () => {
    sessionStorage.removeItem("loginUser");
    alert("로그아웃 되었습니다.");
    setIsLoggedIn(false);
    nav("/"); // 홈으로 이동
  };

	// 스크롤 시 드롭박스 위치 동적 조정
	useEffect(() => {
		const updateDropdownPosition = () => {
			const header = document.querySelector('.sticky-header');
			const dropdowns = document.querySelectorAll('.drop');
			
			if (header && dropdowns.length > 0) {
				const headerRect = header.getBoundingClientRect();
				const headerBottom = headerRect.bottom;
				
				dropdowns.forEach(dropdown => {
					dropdown.style.top = `${headerBottom}px`;
				});
			}
		};

		// 초기 위치 설정
		updateDropdownPosition();

		// 스크롤 이벤트 리스너 추가
		window.addEventListener('scroll', updateDropdownPosition);
		window.addEventListener('resize', updateDropdownPosition);

		// 클린업
		return () => {
			window.removeEventListener('scroll', updateDropdownPosition);
			window.removeEventListener('resize', updateDropdownPosition);
		};
	}, []);

	return ( 
		<>

<div className="header__util util pc-only">
      <div className="util__inner">
        <div className="util__link-list" data-custom-toggle="wrap">

          {/* 로그인 상태에 따라 버튼 변경 */}
          {isLoggedIn ? (
            <a
              href="javascript:;"
              className="util__link"
              onClick={handleLogout}
            >
              로그아웃
            </a>
          ) : (
            <a
              href="javascript:;"
              className="util__link"
              data-action="menu" 
              data-menu-name="login"
              onClick={() => nav("/login")}
            >
              로그인
            </a>
          )}


          <a onClick={() =>nav('/user-agreement')} href="javascript:;" className="util__link" data-action="menu" data-menu-name="join">회원가입</a>

          {/* // 로그인 전 노출 */}

          <a href="javascript:;" onClick={() => URL_LINK.getI18Url('/event/event.do')} className="util__link">진행중인 이벤트</a>

          <a href="javascript:;" onClick={() => URL_LINK.getI18Url('/customerService/csCenter/faqList.do')}
            className="util__link">고객센터</a>

          <a href="javascript:;" onClick={() => URL_LINK.getI18Url('/customerServiceCenter/notice.do')}
            className="util__link">공지사항</a>

          <button type="button" className="util__country" data-custom-toggle="button">
            <span className="text">
              한국어
            </span>
          </button>
          <div className="header-country__layer" data-custom-toggle="panel" style={{}}>
            <div className="country__title">
              지역 및 언어 설정
            </div>
            <div className="country__input">
              <div className="select-wrap select-wrap--line">
                <select title="국가 선택" className="select-wrap__select selected" name="countryChoice" id="countryChoice" defaultValue="KR">
                  <option value="KR">대한민국</option>
                  <option value="JP">日本</option>
                  <option value="CN">中国</option>
                  <option value="US">US</option>
                  <option value="TH">THAILAND</option>
                  <option value="VN">VIETNAM</option>
                  <option value="PH">PHILLIPINES</option>
                  <option value="MY">MALAYSIA</option>
                  <option value="LA">LAOS</option>
                  <option value="SG">SINGAPORE</option>
                  <option value="MN">MONGOLIA</option>
                  <option value="ID">INDONESIA</option>
                </select>
              </div>
              <div className="select-wrap select-wrap--line">
                <select className="select-wrap__select selected" title="언어 선택" name="languageChoice" id="languageChoice">
                  <option value="ko" selected={true}>한국어</option>
                </select>
              </div>
              <button className="country__button" id="countryAndLanguageChoiceBtn" data-flag="base">확인</button>
            </div>
            <button className="button-close" data-custom-toggle="close">
              <span className="hidden">닫기</span>
            </button>
          </div>
        </div>
      </div>
    </div>


		<div className="sticky-header" data-sticky="">
  <div className="header__box">
    {/* header__box 추가 */}
    <h1 className="header__logo" onClick={() =>  nav('/')} style={{ cursor: 'pointer' }}>
      <img
        src="https://static.jejuair.net/cms/images/banner_image/20250123100048468.png"
        alt=""
        loading="lazy"
      />
    </h1>

    {/* S 전체매뉴 개선 start gnb + 전체메뉴 합치기 및 그룹화 */}
    <div className="header_gnb">
      <ul className="mega-menu">
        {/* S GNB TOB LV1 */}

        <li>
          <a
            data-ep-event-area="상단"
            data-ep-visit-channel-option="PC-WEB"
            data-ep-language-environment="ko-KR"
            data-event-name="click_gnb"
            data-ep-visit-login-yn="N"
            ><span>예약</span></a>

          <div className="drop">
            {/* 기존 전체메뉴 부분  */}
            <ul>
              {/* S전체메뉴 */}

              {/* S chLV2 MENU*/}

              <li>
                <a
                  href="javascript:void(0);"
                  onClick={() => URL_LINK.getI18Url('/ibe/booking/Availability.do')}
                  >예매 안내</a
                >

                <div className="drop-depth">
                  <ul>
                    {/* S chLV3 MENU*/}

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="예매 안내"
                        data-ep-event-button="항공권 예매"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); nav('/reserv'); }}
                        >항공권 예매</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="예매 안내"
                        data-ep-event-button="나중에 결제"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/additionalService/service/afterPayGuide.do'); }}
                        >나중에 결제</a>
                      
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="예매 안내"
                        data-ep-event-button="운임옵션"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/additionalService/service/fareOption.do'); }}
                        >운임옵션</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="예매 안내"
                        data-ep-event-button="결제혜택"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/prepare/fare/payBenefit.do'); }}
                        >결제혜택</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="예매 안내"
                        data-ep-event-button="기프티켓"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/additionalService/service/gifticket.do'); }}
                        >기프티켓</a
                      >
                    </li>

                    {/* E chLV3 MENU*/}
                  </ul>
                </div>
              </li>

              <li>
                <a
                  href="javascript:void(0);"
                  onClick={(e) => { sendGAAttrEvent(e); nav('/ViewOnOffReservationList'); }}
                  >예약 안내</a
                >

                <div className="drop-depth">
                  <ul>
                    {/* S chLV3 MENU*/}

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="예약 안내"
                        data-ep-event-button="나의 예약 현황"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); nav('/ViewReservationList'); }}
                        >나의 예약 현황</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="예약 안내"
                        data-ep-event-button="비회원 예약 조회"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); nav('/ViewOnOffReservationList'); }}
                        >비회원 예약 조회</a
                      >
                    </li>

                    {/* E chLV3 MENU*/}
                  </ul>
                </div>
              </li>

              <li>
                <a
                  href="javascript:void(0);"
                  onClick={(e) => { sendGAAttrEvent(e); nav('/DomesticBenefit'); }}
                  >운임 규정 안내</a
                >

                <div className="drop-depth">
                  <ul>
                    {/* S chLV3 MENU*/}

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="운임 규정 안내"
                        data-ep-event-button="국내선 운임"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); nav('/DomesticBenefit'); }}
                        >국내선 운임</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="운임 규정 안내"
                        data-ep-event-button="국제선 운임"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); nav('/internationalBenefit'); }}
                        >국제선 운임</a
                      >
                    </li>

                    {/* E chLV3 MENU*/}
                  </ul>
                </div>
              </li>

              <li>
                <a
                  href="javascript:void(0);"
                  onClick={() => nav('/flight-info')}
                  >운항 조회</a
                >

                <div className="drop-depth">
                  <ul>
                    {/* S chLV3 MENU*/}

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="운항 조회"
                        data-ep-event-button="운항 스케줄"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); nav('/flight-info?index=1'); }}
                        >운항 스케줄</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="운항 조회"
                        data-ep-event-button="출도착 현황"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); nav('/flight-info?index=2'); }}
                        >출도착 현황</a
                      >
                    </li>

                    {/* E chLV3 MENU*/}
                  </ul>
                </div>
              </li>

              {/* E chLV2 MENU*/}
              {/* E 전체메뉴 */}
            </ul>
          </div>
        </li>

        <li>
          <a
            data-ep-event-area="상단"
            data-ep-visit-channel-option="PC-WEB"
            data-ep-language-environment="ko-KR"
            data-event-name="click_gnb"
            data-ep-visit-login-yn="N"
            ><span>여행 준비</span></a>

          <div className="drop">
            {/* 기존 전체메뉴 부분  */}
            <ul>
              {/* S전체메뉴 */}

              {/* S chLV2 MENU*/}

              <li>
                <a
                  href="javascript:void(0);"
                  onClick={() => URL_LINK.getI18Url('/linkService/fastProcedure/guide.do')}
                  >탑승 수속 안내</a
                >

                <div className="drop-depth">
                  <ul>
                    {/* S chLV3 MENU*/}

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="탑승 수속 안내"
                        data-ep-event-button="빠른 수속"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/linkService/fastProcedure/guide.do'); }}
                        >빠른 수속</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="탑승 수속 안내"
                        data-ep-event-button="모바일 탑승권"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/ibe/checkin/viewCheckin.do'); }}
                        >모바일 탑승권</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="탑승 수속 안내"
                        data-ep-event-button="공항 정보"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/linkService/airport/info.do'); }}
                        >공항 정보</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="탑승 수속 안내"
                        data-ep-event-button="출입국 신고서"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/cabinService/immigration/etcFormGuide.do'); }}
                        >출입국 신고서</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="탑승 수속 안내"
                        data-ep-event-button="공항 혼잡도 안내"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/linkService/airport/airportStatus.do'); }}
                        >공항 혼잡도 안내</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="탑승 수속 안내"
                        data-ep-event-button="사전 서약서"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/prepare/eDocument/main.do'); }}
                        >사전 서약서</a
                      >
                    </li>

                    {/* E chLV3 MENU*/}
                  </ul>
                </div>
              </li>

              <li>
                <a
  href="javascript:void(0);"
  onClick={() => { window.location.href = URL_LINK.getI18Url('/additionalService/service/preorderedBaggage.do'); }}
>
  수하물 안내
</a>

                <div className="drop-depth">
                  <ul>
                    {/* S chLV3 MENU*/}

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="수하물 안내"
                        data-ep-event-button="사전 수하물"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/additionalService/service/preorderedBaggage.do'); }}
                        >사전 수하물</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="수하물 안내"
                        data-ep-event-button="기내 수하물"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/linkService/boardingProcessGuide/cabinBaggage.do'); }}
                        >기내 수하물</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="수하물 안내"
                        data-ep-event-button="위탁 수하물"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/linkService/baggageGuide/checkedBaggage.do'); }}
                        >위탁 수하물</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="수하물 안내"
                        data-ep-event-button="운송제한 물품"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/linkService/boardingProcessGuide/transportLimitation.do'); }}
                        >운송제한 물품</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="수하물 안내"
                        data-ep-event-button="수하물 분실 및 배상"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/linkService/boardingProcessGuide/liability.do'); }}
                        >수하물 분실 및 배상</a
                      >
                    </li>

                    {/* E chLV3 MENU*/}
                  </ul>
                </div>
              </li>

              <li>
                <a
                  href="javascript:void(0);"
                  onClick={() => URL_LINK.getI18Url('/additionalService/service/preorderedSeat.do?tabIndex=1')}
                  >좌석 안내</a
                >

                <div className="drop-depth">
                  <ul>
                    {/* S chLV3 MENU*/}

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="좌석 안내"
                        data-ep-event-button="사전 좌석 구매"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/additionalService/service/preorderedSeat.do?tabIndex=1'); }}
                        >사전 좌석 구매</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="좌석 안내"
                        data-ep-event-button="현장 좌석 구매"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/additionalService/service/preorderedSeat.do?tabIndex=2'); }}
                        >현장 좌석 구매</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="좌석 안내"
                        data-ep-event-button="비즈니스 라이트"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/premium/businesslite/main.do'); }}
                        >비즈니스 라이트</a
                      >
                    </li>

                    {/* E chLV3 MENU*/}
                  </ul>
                </div>
              </li>

              <li>
                <a
                  href="javascript:void(0);"
                  onClick={() => URL_LINK.getI18Url('/additionalService/service/preorderedMeal.do')}
                  >기내 서비스 안내</a
                >

                <div className="drop-depth">
                  <ul>
                    {/* S chLV3 MENU*/}

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="기내 서비스 안내"
                        data-ep-event-button="사전 기내식"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/additionalService/service/preorderedMeal.do'); }}
                        >사전 기내식</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="기내 서비스 안내"
                        data-ep-event-button="에어카페 &amp; 설렘배송"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/cabinService/service/airCafe.do'); }}
                        >에어카페 &amp; 설렘배송</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="기내 서비스 안내"
                        data-ep-event-button="기내 면세품 사전주문"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/cabinService/service/dutyFree.do'); }}
                        >기내 면세품 사전주문</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="기내 서비스 안내"
                        data-ep-event-button="기내 FUN 서비스"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/cabinService/service/funService.do'); }}
                        >기내 FUN 서비스</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="기내 서비스 안내"
                        data-ep-event-button="기내 유실물 찾기"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/customerService/cabinLost/cabinLost.do'); }}
                        >기내 유실물 찾기</a
                      >
                    </li>

                    {/* E chLV3 MENU*/}
                  </ul>
                </div>
              </li>

              <li>
              <a
					href="javascript:void(0);"
					style={{ color: '#ff5000' }}
					onClick={() => { window.location.href = URL_LINK.getI18Url('/terms/page/jtrip.do'); }}
					>
					여행안내 J-트립
					</a>

                <div className="drop-depth">
                  <ul>
                    {/* S chLV3 MENU*/}

                    {/* E chLV3 MENU*/}
                  </ul>
                </div>
              </li>

              {/* E chLV2 MENU*/}
              {/* E 전체메뉴 */}
            </ul>
          </div>
        </li>

        <li>
          <a
            data-ep-event-area="상단"
            data-ep-visit-channel-option="PC-WEB"
            data-ep-language-environment="ko-KR"
            data-event-name="click_gnb"
            data-ep-visit-login-yn="N"
            ><span>여행 편의</span></a>

          <div className="drop">
            {/* 기존 전체메뉴 부분  */}
            <ul>
              {/* S전체메뉴 */}

              {/* S chLV2 MENU*/}

              <li>
                <a
                  href="javascript:void(0);"
                  onClick={() => URL_LINK.getI18Url('/premium/golfMembership/main.do')}
                  >스포츠 서비스</a
                >

                <div className="drop-depth">
                  <ul>
                    {/* S chLV3 MENU*/}

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="스포츠 서비스"
                        data-ep-event-button="골프 멤버십"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/premium/golfMembership/main.do'); }}
                        >골프 멤버십</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="스포츠 서비스"
                        data-ep-event-button="스포츠 멤버십"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/premium/sportsMembership/main.do'); }}
                        >스포츠 멤버십</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="스포츠 서비스"
                        data-ep-event-button="자전거 케이스 대여"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/additionalService/service/carringBagGuide.do'); }}
                        >자전거 케이스 대여</a
                      >
                    </li>

                    {/* E chLV3 MENU*/}
                  </ul>
                </div>
              </li>

              <li>
                <a
                  href="javascript:void(0);"
                  onClick={() => URL_LINK.getI18Url('/linkService/help/main.do?index=2')}
                  >케어 서비스</a
                >

                <div className="drop-depth">
                  <ul>
                    {/* S chLV3 MENU*/}

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="케어 서비스"
                        data-ep-event-button="유아 동반 고객"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/linkService/help/main.do?index=2'); }}
                        >유아 동반 고객</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="케어 서비스"
                        data-ep-event-button="어린이 안심 케어 서비스"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/linkService/help/main.do?index=3'); }}
                        >어린이 안심 케어 서비스</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="케어 서비스"
                        data-ep-event-button="휠체어 이용 고객"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/linkService/help/main.do?index=4'); }}
                        >휠체어 이용 고객</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="케어 서비스"
                        data-ep-event-button="임산부 고객"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/linkService/help/main.do?index=5'); }}
                        >임산부 고객</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="케어 서비스"
                        data-ep-event-button="의사소견서 필요 고객"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/linkService/help/main.do?index=6'); }}
                        >의사소견서 필요 고객</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="케어 서비스"
                        data-ep-event-button="시각,청각 장애인 고객"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/linkService/help/main.do?index=7'); }}
                        >시각,청각 장애인 고객</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="케어 서비스"
                        data-ep-event-button="우선 혜택 서비스"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/linkService/passengerAssistant/main.do'); }}
                        >우선 혜택 서비스</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="케어 서비스"
                        data-ep-event-button="기내 수어 서비스"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/linkService/signLanguage/main.do'); }}
                        >기내 수어 서비스</a
                      >
                    </li>

                    {/* E chLV3 MENU*/}
                  </ul>
                </div>
              </li>

              <li>
                <a
                  href="javascript:void(0);"
                  onClick={() => URL_LINK.getI18Url('/linkService/help/main.do')}
                  >반려동물 서비스</a
                >

                <div className="drop-depth">
                  <ul>
                    {/* S chLV3 MENU*/}

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="반려동물 서비스"
                        data-ep-event-button="반려동물 운송 서비스"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/linkService/help/main.do'); }}
                        >반려동물 운송 서비스</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="반려동물 서비스"
                        data-ep-event-button="펫 멤버십 / 펫 패스"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/linkService/petService/main.do'); }}
                        >펫 멤버십 / 펫 패스</a
                      >
                    </li>

                    {/* E chLV3 MENU*/}
                  </ul>
                </div>
              </li>

              <li>
                <a
                  href="javascript:void(0);"
                  onClick={() => URL_LINK.getI18Url('/additionalService/service/insurance.do')}
                  >보험 및 보장
                </a>

                <div className="drop-depth">
                  <ul>
                    {/* S chLV3 MENU*/}

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="보험 및 보장 "
                        data-ep-event-button="여행자 보험"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/additionalService/service/insurance.do'); }}
                        >여행자 보험</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="보험 및 보장 "
                        data-ep-event-button="수수료안심플러스+"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/additionalService/service/carePlusGuide.do'); }}
                        >수수료안심플러스+</a
                      >
                    </li>

                    {/* E chLV3 MENU*/}
                  </ul>
                </div>
              </li>

              <li>
                <a
                  href="javascript:void(0);"
                  onClick={() => URL_LINK.getI18Url('https://jejuairshop.com/')}
                  >J SHOP</a
                >

                <div className="drop-depth">
                  <ul>
                    {/* S chLV3 MENU*/}

                    {/* E chLV3 MENU*/}
                  </ul>
                </div>
              </li>

              {/* E chLV2 MENU*/}
              {/* E 전체메뉴 */}
            </ul>
          </div>
        </li>

        <li>
          <a
            data-ep-event-area="상단"
            data-ep-visit-channel-option="PC-WEB"
            data-ep-language-environment="ko-KR"
            data-event-name="click_gnb"
            data-ep-visit-login-yn="N"
            ><span>J 멤버스</span></a>

          <div className="drop">
            {/* 기존 전체메뉴 부분  */}
            <ul>
              {/* S전체메뉴 */}

              {/* S chLV2 MENU*/}

              <li>
                <a
                  href="javascript:void(0);"
                  onClick={() => URL_LINK.getI18Url('/memberBenefit/refreshPoint/main.do')}
                  >J 포인트</a
                >

                <div className="drop-depth">
                  <ul>
                    {/* S chLV3 MENU*/}

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="J 포인트"
                        data-ep-event-button="J 포인트 안내"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/memberBenefit/refreshPoint/main.do'); }}
                        >J 포인트 안내</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="J 포인트"
                        data-ep-event-button="포인트 조회"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/memberBenefit/refreshPoint/pointSearch.do'); }}
                        >포인트 조회</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="J 포인트"
                        data-ep-event-button="탑승 후 적립"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/memberBenefit/refreshPoint/boardingAfterPointSave.do'); }}
                        >탑승 후 적립</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="J 포인트"
                        data-ep-event-button="포인트 구매/선물"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/memberBenefit/refreshPoint/pointBuy.do'); }}
                        >포인트 구매/선물</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="J 포인트"
                        data-ep-event-button="포인트 보내기"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/memberBenefit/refreshPoint/pointSend.do'); }}
                        >포인트 보내기</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="J 포인트"
                        data-ep-event-button="포인트 사용"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/memberBenefit/refreshPoint/pointUse.do'); }}
                        >포인트 사용</a
                      >
                    </li>

                    {/* E chLV3 MENU*/}
                  </ul>
                </div>
              </li>

              <li>
                <a
                  href="javascript:void(0);"
                  onClick={() => URL_LINK.getI18Url('/memberBenefit/memberBenefit.do?param=newMember')}
                  >J 멤버스</a
                >

                <div className="drop-depth">
                  <ul>
                    {/* S chLV3 MENU*/}

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="J 멤버스"
                        data-ep-event-button="회원등급 안내"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/memberBenefit/refreshPoint/grade.do'); }}
                        >회원등급 안내</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="J 멤버스"
                        data-ep-event-button="신규 회원 혜택"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/memberBenefit/memberBenefit.do?param=newMember'); }}
                        >신규 회원 혜택</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="J 멤버스"
                        data-ep-event-button="프로모션 코드"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/memberBenefit/memberBenefit.do?param=promotion'); }}
                        >프로모션 코드</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="J 멤버스"
                        data-ep-event-button="쿠폰 등록"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/memberBenefit/regCoupon.do'); }}
                        >쿠폰 등록</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="J 멤버스"
                        data-ep-event-button="나의 쿠폰"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/member/mypage/viewMyPartnerCoupon.do'); }}
                        >나의 쿠폰</a
                      >
                    </li>

                    {/* E chLV3 MENU*/}
                  </ul>
                </div>
              </li>

              {/* E chLV2 MENU*/}
              {/* E 전체메뉴 */}
            </ul>
          </div>
        </li>

        <li>
          <a
            data-ep-event-area="상단"
            data-ep-visit-channel-option="PC-WEB"
            data-ep-language-environment="ko-KR"
            data-event-name="click_gnb"
            data-ep-visit-login-yn="N"
            ><span>이벤트/제휴</span></a>

          <div className="drop">
            {/* 기존 전체메뉴 부분  */}
            <ul>
              {/* S전체메뉴 */}

              {/* S chLV2 MENU*/}

              <li>
                <a
                  href="javascript:void(0);"
                  onClick={() => URL_LINK.getI18Url('/event/event.do')}
                  >이벤트</a
                >

                <div className="drop-depth">
                  <ul>
                    {/* S chLV3 MENU*/}

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="이벤트"
                        data-ep-event-button="진행중인 이벤트"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/event/event.do'); }}
                        >진행중인 이벤트</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="이벤트"
                        data-ep-event-button="종료된 이벤트"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/event/pastEvent.do'); }}
                        >종료된 이벤트</a
                      >
                    </li>

                    {/* E chLV3 MENU*/}
                  </ul>
                </div>
              </li>

              <li>
                <a
                  href="javascript:void(0);"
                  onClick={() => URL_LINK.getI18Url('/premium/jjmembers/jjmembersPartners.do')}
                  >J 멤버스 혜택존</a
                >

                <div className="drop-depth">
                  <ul>
                    {/* S chLV3 MENU*/}

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="J 멤버스 혜택존"
                        data-ep-event-button="호텔/숙소"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/premium/jjmembers/jjmembersPartners.do?dataIndex=1'); }}
                        >호텔/숙소</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="J 멤버스 혜택존"
                        data-ep-event-button="렌트카"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/premium/jjmembers/jjmembersPartners.do?dataIndex=2'); }}
                        >렌트카</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="J 멤버스 혜택존"
                        data-ep-event-button="금융/여행자보험"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/premium/jjmembers/jjmembersPartners.do?dataIndex=3'); }}
                        >금융/여행자보험</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="J 멤버스 혜택존"
                        data-ep-event-button="골프"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/premium/jjmembers/jjmembersPartners.do?dataIndex=4'); }}
                        >골프</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="J 멤버스 혜택존"
                        data-ep-event-button="공항편의"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/premium/jjmembers/jjmembersPartners.do?dataIndex=5'); }}
                        >공항편의</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="J 멤버스 혜택존"
                        data-ep-event-button="투어"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/premium/jjmembers/jjmembersPartners.do?dataIndex=6'); }}
                        >투어</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="J 멤버스 혜택존"
                        data-ep-event-button="관광"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/premium/jjmembers/jjmembersPartners.do?dataIndex=7'); }}
                        >관광</a
                      >
                    </li>

                    <li>
                      <a
                        href="javascript:void(0);"
                        className="gnb__list-item"
                        data-ep-event-area="J 멤버스 혜택존"
                        data-ep-event-button="먹거리"
                        data-ep-visit-channel-option="PC-WEB"
                        data-ep-language-environment="ko-KR"
                        data-event-name="click_lnb"
                        data-ep-visit-login-yn="N"
                        onClick={(e) => { sendGAAttrEvent(e); URL_LINK.getI18Url('/premium/jjmembers/jjmembersPartners.do?dataIndex=8'); }}
                        >먹거리</a
                      >
                    </li>

                    {/* E chLV3 MENU*/}
                  </ul>
                </div>
              </li>

              {/* E chLV2 MENU*/}
              {/* E 전체메뉴 */}
            </ul>
          </div>
        </li>

        <li data-lnb="false">
          <a
            data-ep-event-area="상단"
            target="_blank"
            href="/ko/newj/index.do"
            data-link="/newj/index.do"
            data-ep-visit-channel-option="PC-WEB"
            data-ep-language-environment="ko-KR"
            data-event-name="click_gnb"
            data-ep-visit-login-yn="N"
            ><span>J 캠페인</span></a>
        </li>

        {/* E GNB TOB LV1 */}
      </ul>
    </div>
    {/* E 전체매뉴 개선 start gnb + 전체메뉴 합치기 및 그룹화*/}


    {/* 신규 myPage 아이콘*/}
    <div className="header_mypage login">
      <a 
      className="btn_login"
      onClick={handleMyPageClick}
      >
          <span className="t-hide">마이페이지</span></a>
    </div>

    {/*  전체 매뉴 개선 토글버튼 삭제 */}

  </div>
</div>
		</>
	);
}

export default Header;