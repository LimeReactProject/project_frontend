import React from 'react';
import '../../css/home/QuickLinkSection.css';
import { useNavigate } from 'react-router-dom';

// URL_LINK 유틸리티 함수
const URL_LINK = {
  getI18Url: (url) => {
    console.log('Navigating to:', url);
    // 실제 라우팅 로직 구현
  }
};

function QuickLinkSection() {

  const nav = useNavigate();

  return (
    <section className="section_quick_link">
      {/* 8개 영역: pc-only */}
      <div className="promotion-list">
        <div className="swiper-container MainBannerTop-pc swiper-container-initialized swiper-container-horizontal"
          data-carousel="MainBannerTop">
          <div className="swiper-wrapper" style={{ transform: 'translate3d(-3.976px, 0px, 0px)', transitionDuration: '0ms' }}>
            <a 
              href="javascript:void(0);" 
              onClick={() => URL_LINK.getI18Url('/additionalService/service/preorderedBaggage.do')}
              className="swiper-slide swiper-slide-active"
            >
              <a href="https://www.jejuair.net/ko/additionalService/service/preorderedBaggage.do">
                <div className="carousel_bg">
                  <img 
                    src="https://static.jejuair.net/hpgg/resources/images/@temp/section_quick_01.png" 
                    alt=""
                    loading="lazy"
                  />
                </div>
              </a>

              <div className="txt-wrap">
                <div className="name">사전 수하물</div>
              </div>
            </a>
            <a 
              href="javascript:void(0);"
              onClick={() => URL_LINK.getI18Url('/additionalService/service/preorderedSeat.do?tabIndex=1')}
              className="swiper-slide swiper-slide-next"
            >
              <a href="https://www.jejuair.net/ko/additionalService/service/preorderedSeat.do?tabIndex=1">
              <div className="carousel_bg">
                <img 
                  src="https://static.jejuair.net/hpgg/resources/images/@temp/section_quick_02.png" 
                  alt=""
                  loading="lazy"
                />
              </div>
              </a>

              <div className="txt-wrap">
                <div className="name">사전 좌석</div>
              </div>
            </a>
            <a 
              href="javascript:void(0);" 
              onClick={() => URL_LINK.getI18Url('/additionalService/service/preorderedMeal.do')}
              className="swiper-slide"
            >
              <a href="https://www.jejuair.net/ko/additionalService/service/preorderedMeal.do">
              <div className="carousel_bg">
                <img 
                  src="https://static.jejuair.net/hpgg/resources/images/@temp/section_quick_03.png" 
                  alt=""
                  loading="lazy"
                />
              </div>
              </a>

              <div className="txt-wrap">
                <div className="name">사전 기내식</div>
              </div>
            </a>

            <a 
              href="javascript:void(0);" 
              onClick={() => URL_LINK.getI18Url('/additionalService/service/insurance.do')}
              className="swiper-slide"
            >
              <a href="https://www.jejuair.net/ko/additionalService/service/insurance.do">
              <div className="carousel_bg">
                <img 
                  src="https://static.jejuair.net/hpgg/resources/images/@temp/section_quick_04.png" 
                  alt=""
                  loading="lazy"
                />
              </div>
              </a>
              <div className="txt-wrap">
                <div className="name">여행자 보험</div>
              </div>
            </a>
            <a 
              href="javascript:void(0);" 
              onClick={() => URL_LINK.getI18Url('/ibe/checkin/viewCheckin.do')}
              className="swiper-slide"
            >
              <a href="https://wcc.jejuair.net/ko/ibe/checkin/viewCheckin.do">
              <div className="carousel_bg">
                <img 
                  src="https://static.jejuair.net/hpgg/resources/images/@temp/section_quick_05.png" 
                  alt=""
                  loading="lazy"
                />
              </div>
              </a>

              <div className="txt-wrap">
                <div className="name">모바일 탑승권</div>
              </div>
            </a>

            <a 
              href="javascript:void(0);" 
              onClick={() => URL_LINK.getI18Url('/linkService/airport/info.do')}
              className="swiper-slide"
            >
              <a href="https://www.jejuair.net/ko/linkService/airport/info.do">
              <div className="carousel_bg">
                <img 
                  src="https://static.jejuair.net/hpgg/resources/images/@temp/section_quick_06.png" 
                  alt=""
                  loading="lazy"
                />
              </div>
              </a>
              
              <div className="txt-wrap">
                <div className="name">공항 정보</div>
              </div>
            </a>
            <a 
              href="javascript:void(0);"
              onClick={() => URL_LINK.getI18Url('/linkService/boardingProcessGuide/transportLimitation.do')}
              className="swiper-slide"
            >
               <a href="https://www.jejuair.net/ko/linkService/boardingProcessGuide/transportLimitation.do">
              <div className="carousel_bg">
                <img 
                  src="https://static.jejuair.net/hpgg/resources/images/@temp/section_quick_07.png" 
                  alt=""
                  loading="lazy"
                />
              </div>
              </a>

              <div className="txt-wrap">
                <div className="name">운송제한 물품</div>
              </div>
            </a>
            <a 
              href="javascript:void(0);" 
              onClick={() => URL_LINK.getI18Url('/linkService/help/main.do')}
              className="swiper-slide"
            >
              <a href="https://www.jejuair.net/ko/linkService/help/main.do">
              <div className="carousel_bg">
                <img 
                  src="https://static.jejuair.net/hpgg/resources/images/@temp/section_quick_08_n.png" 
                  alt=""
                  loading="lazy"
                />
              </div>
              </a>

              <div className="txt-wrap">
                <div className="name">반려동물 동반</div>
              </div>
            </a>
          </div>
          <div className="swiper-scrollbar" style={{}}>
            <div 
              className="swiper-scrollbar-drag"
              style={{ 
                transform: 'translate3d(0.023847px, 0px, 0px)', 
                transitionDuration: '0ms', 
                width: '0px' 
              }}
            />
          </div>
          <span className="swiper-notification" aria-live="assertive" aria-atomic="true" />
        </div>
      </div>
    </section>
  );
}

export default QuickLinkSection;
