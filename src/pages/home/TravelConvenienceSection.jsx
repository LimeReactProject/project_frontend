import React, { useState } from 'react';
import './TravelConvenienceSection.css';

// URL_LINK 유틸리티 함수
const URL_LINK = {
  getI18Url: (url) => {
    console.log('Navigating to:', url);
    // 실제 라우팅 로직 구현
  }
};

function TravelConvenienceSection() {
  const [activeTab, setActiveTab] = useState(0);

  const tabData = [
    {
      title: '여행 전',
      content: (
        <>
          <div className="section-wrap-gp">
            <div className="section-wrap mt0">
              <a 
                href="javascript:void(0);"
                onClick={() => URL_LINK.getI18Url('/additionalService/service/preorderedSeat.do?tabIndex=1')}
              >
                <div className="banner mo-view">
                  <div 
                    className="banner_single-img pc-only"
                    style={{ 
                      backgroundImage: 'url(https://static.jejuair.net/hpgg/resources/images/@temp/section_travel_t1_01.png)' 
                    }}
                  >
                    <div className="banner-text-overlay">
                      <div className="banner-title">사전 좌석</div>
                      <div className="banner-subtitle">원하는 좌석을 예약해 보세요.</div>
                    </div>
                  </div>
                  <div 
                    className="banner_single-img mobile-only"
                    style={{ 
                      backgroundImage: 'url(https://static.jejuair.net/hpgg/resources/images/@temp/section_travel_t1_01.png)' 
                    }}
                  >
                    <div className="banner-text-overlay">
                      <div className="banner-title">사전 좌석</div>
                      <div className="banner-subtitle">원하는 좌석을 예약해 보세요.</div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="right-cards">
              <div className="section-wrap mt0">
                <a 
                  href="javascript:void(0);" 
                  onClick={() => URL_LINK.getI18Url('/premium/businesslite/main.do')}
                >
                  <div className="banner mo-view">
                    <div 
                      className="banner_single-img pc-only"
                      style={{ 
                        backgroundImage: 'url(https://static.jejuair.net/hpgg/resources/images/@temp/section_travel_t1_02.png)' 
                      }}
                    >
                      <div className="banner-text-overlay">
                        <div className="banner-title">비즈니스 라이트</div>
                        <div className="banner-subtitle">넓고 편안한 좌석이 준비되어 있어요.</div>
                      </div>
                    </div>
                    <div 
                      className="banner_single-img mobile-only"
                      style={{ 
                        backgroundImage: 'url(https://static.jejuair.net/hpgg/resources/images/@temp/section_travel_t1_02.png)' 
                      }}
                    >
                      <div className="banner-text-overlay">
                        <div className="banner-title">비즈니스 라이트</div>
                        <div className="banner-subtitle">넓고 편안한 좌석이 준비되어 있어요.</div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="section-wrap mt0">
                <a 
                  href="javascript:void(0);"
                  onClick={() => URL_LINK.getI18Url('/additionalService/service/preorderedBaggage.do')}
                >
                  <div className="banner mo-view">
                    <div 
                      className="banner_single-img pc-only"
                      style={{ 
                        backgroundImage: 'url(https://static.jejuair.net/hpgg/resources/images/@temp/section_travel_t1_03.png)' 
                      }}
                    >
                      <div className="banner-text-overlay">
                        <div className="banner-title">사전 수하물</div>
                        <div className="banner-subtitle">현장보다 저렴하게 구매해 보세요.</div>
                      </div>
                    </div>
                    <div 
                      className="banner_single-img mobile-only"
                      style={{ 
                        backgroundImage: 'url(https://static.jejuair.net/hpgg/resources/images/@temp/section_travel_t1_03.png)' 
                      }}
                    >
                      <div className="banner-text-overlay">
                        <div className="banner-title">사전 수하물</div>
                        <div className="banner-subtitle">현장보다 저렴하게 구매해 보세요.</div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </>
      )
    },
    {
      title: '기내에서',
      content: (
        <>
          <div className="section-wrap-gp">
            <div className="section-wrap mt0">
              <a 
                href="javascript:void(0);" 
                onClick={() => URL_LINK.getI18Url('/additionalService/service/preorderedMeal.do')}
              >
                <div className="banner mo-view">
                  <div 
                    className="banner_single-img pc-only"
                    style={{ 
                      backgroundImage: 'url(https://static.jejuair.net/hpgg/resources/images/@temp/section_travel_t2_01.png)' 
                    }}
                  >
                    <div className="banner-text-overlay">
                      <div className="banner-title">사전 기내식</div>
                      <div className="banner-subtitle">특별한 메뉴들이 준비되어 있어요.</div>
                    </div>
                  </div>
                  <div 
                    className="banner_single-img mobile-only"
                    style={{ 
                      backgroundImage: 'url(https://static.jejuair.net/hpgg/resources/images/@temp/section_travel_t2_01.png)' 
                    }}
                  >
                    <div className="banner-text-overlay">
                      <div className="banner-title">사전 기내식</div>
                      <div className="banner-subtitle">특별한 메뉴들이 준비되어 있어요.</div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="right-cards">
              <div className="section-wrap mt0">
                <a 
                  href="javascript:void(0);" 
                  onClick={() => URL_LINK.getI18Url('/cabinService/service/airCafe.do')}
                >
                  <div className="banner mo-view">
                    <div 
                      className="banner_single-img pc-only"
                      style={{ 
                        backgroundImage: 'url(https://static.jejuair.net/hpgg/resources/images/@temp/section_travel_t2_02.png)' 
                      }}
                    >
                      <div className="banner-text-overlay">
                        <div className="banner-title">에어카페 & 설렘배송</div>
                        <div className="banner-subtitle">다양한 상품들을 만나보세요.</div>
                      </div>
                    </div>
                    <div 
                      className="banner_single-img mobile-only"
                      style={{ 
                        backgroundImage: 'url(https://static.jejuair.net/hpgg/resources/images/@temp/section_travel_t2_02.png)' 
                      }}
                    >
                      <div className="banner-text-overlay">
                        <div className="banner-title">에어카페 & 설렘배송</div>
                        <div className="banner-subtitle">다양한 상품들을 만나보세요.</div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="section-wrap mt0">
                <a 
                  href="javascript:void(0);" 
                  onClick={() => URL_LINK.getI18Url('/cabinService/service/dutyFree.do')}
                >
                  <div className="banner mo-view">
                    <div 
                      className="banner_single-img pc-only"
                      style={{ 
                        backgroundImage: 'url(https://static.jejuair.net/hpgg/resources/images/@temp/section_travel_t2_03.png)' 
                      }}
                    >
                      <div className="banner-text-overlay">
                        <div className="banner-title">기내 면세품 사전 주문</div>
                        <div className="banner-subtitle">원하는 면세품을 기내에서 받아보세요.</div>
                      </div>
                    </div>
                    <div 
                      className="banner_single-img mobile-only"
                      style={{ 
                        backgroundImage: 'url(https://static.jejuair.net/hpgg/resources/images/@temp/section_travel_t2_03.png)' 
                      }}
                    >
                      <div className="banner-text-overlay">
                        <div className="banner-title">기내 면세품 사전 주문</div>
                        <div className="banner-subtitle">원하는 면세품을 기내에서 받아보세요.</div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </>
      )
    },
    {
      title: '여행 동반',
      content: (
        <>
          <div className="section-wrap-gp">
            <div className="section-wrap mt0">
              <a 
                href="javascript:void(0);" 
                onClick={() => URL_LINK.getI18Url('/additionalService/service/insurance.do')}
              >
                <div className="banner mo-view">
                  <div 
                    className="banner_single-img pc-only"
                    style={{ 
                      backgroundImage: 'url(https://static.jejuair.net/hpgg/resources/images/@temp/section_travel_t3_01.png)' 
                    }}
                  >
                    <div className="banner-text-overlay">
                      <div className="banner-title">여행자 보험</div>
                      <div className="banner-subtitle">안전한 여행을 위해 준비해 보세요.</div>
                    </div>
                  </div>
                  <div 
                    className="banner_single-img mobile-only"
                    style={{ 
                      backgroundImage: 'url(https://static.jejuair.net/hpgg/resources/images/@temp/section_travel_t3_01.png)' 
                    }}
                  >
                    <div className="banner-text-overlay">
                      <div className="banner-title">여행자 보험</div>
                      <div className="banner-subtitle">안전한 여행을 위해 준비해 보세요.</div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="right-cards">
              <div className="section-wrap mt0">
                <a 
                  href="javascript:void(0);"
                  onClick={() => URL_LINK.getI18Url('/additionalService/service/carringBagGuide.do')}
                >
                  <div className="banner mo-view">
                    <div 
                      className="banner_single-img pc-only"
                      style={{ 
                        backgroundImage: 'url(https://static.jejuair.net/hpgg/resources/images/@temp/section_travel_t3_02.png)' 
                      }}
                    >
                      <div className="banner-text-overlay">
                        <div className="banner-title">자전거 케이스</div>
                        <div className="banner-subtitle">특별한 자전거 여행을 떠나보세요.</div>
                      </div>
                    </div>
                    <div 
                      className="banner_single-img mobile-only"
                      style={{ 
                        backgroundImage: 'url(https://static.jejuair.net/hpgg/resources/images/@temp/section_travel_t3_02.png)' 
                      }}
                    >
                      <div className="banner-text-overlay">
                        <div className="banner-title">자전거 케이스</div>
                        <div className="banner-subtitle">특별한 자전거 여행을 떠나보세요.</div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="section-wrap mt0">
                <a 
                  href="https://jejuairgolf.tigergds.com/" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="banner mo-view">
                    <div 
                      className="banner_single-img pc-only"
                      style={{ 
                        backgroundImage: 'url(https://static.jejuair.net/hpgg/resources/images/@temp/section_travel_t3_03.png)' 
                      }}
                    >
                      <div className="banner-text-overlay">
                        <div className="banner-title">실시간 골프 예약</div>
                        <div className="banner-subtitle">여행과 골프를 함께 즐겨보세요.</div>
                      </div>
                    </div>
                    <div 
                      className="banner_single-img mobile-only"
                      style={{ 
                        backgroundImage: 'url(https://static.jejuair.net/hpgg/resources/images/@temp/section_travel_t3_03.png)' 
                      }}
                    >
                      <div className="banner-text-overlay">
                        <div className="banner-title">실시간 골프 예약</div>
                        <div className="banner-subtitle">여행과 골프를 함께 즐겨보세요.</div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </>
      )
    }
  ];

  return (
    <section className="section_travel_convenience">
      <div className="title">
        <h3 className="title__section">여행에 편리함을 더해보세요.</h3>
      </div>

      <div className="section-wrap mt30">
        <div className="select-chips swiper-container mt0 swiper-container-initialized swiper-container-horizontal">
          <ul className="chips-group swiper-wrapper" data-element="">
            {tabData.map((tab, index) => (
              <li key={index} className="chip swiper-slide">
                <button 
                  type="button" 
                  className={`chip-btn ${activeTab === index ? 'checked' : ''}`}
                  data-index={index}
                  onClick={() => setActiveTab(index)}
                >
                  <span className="txt">{tab.title}</span>
                </button>
              </li>
            ))}
          </ul>
          
          <div className="tab_contents" data-element="tab_contents">
            {tabData.map((tab, index) => (
              <div 
                key={index}
                className={activeTab === index ? 'show' : ''} 
                data-chip-show={index}
              >
                {tab.content}
              </div>
            ))}
          </div>
          
          <span className="swiper-notification" aria-live="assertive" aria-atomic="true" />
        </div>
      </div>
    </section>
  );
}

export default TravelConvenienceSection;
