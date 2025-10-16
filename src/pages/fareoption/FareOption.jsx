import React, { useState } from 'react';
import './FareOption.css';
import Header from '../../common/Header';
import Footer from '../../common/Footer';

const FareOption = () => {
  const [selectedTab, setSelectedTab] = useState('domestic');

  return (
    <>
      <Header />
      <main className="fare-option-main">
        {/* 배너 섹션 */}
        <div 
          className="banner_single-img" 
          style={{ backgroundImage: 'url(https://static.jejuair.net/hpgg/resources/images/@temp/bundleguide-image-03.jpg)' }}
        >
          <div className="banner-content">
            <h1>운임 옵션</h1>
            <p>운임 옵션 업그레이드로 개별 구매보다 저렴하게 이용해 보세요.</p>
          </div>
        </div>

        <div className="fare-option-container">
          {/* 운임 옵션 구매 방법 */}
          <section className="purchase-guide">
            <h2>운임 옵션 구매 방법</h2>
            
            <div className="steps-container">
              {/* STEP 01 */}
              <div className="step-card">
                <div className="step-image">
                  <img src="https://static.jejuair.net/hpgg/resources/images/@temp/guide_bundle_05.png" alt="STEP 01" />
                </div>
                <div className="step-content">
                  <h3>STEP 01</h3>
                  <p>국내/국제선 항공편 운임 선택 시, 운임 옵션 선택 페이지로.</p>
                </div>
              </div>

              {/* STEP 02 */}
              <div className="step-card">
                <div className="step-image">
                  <img src="https://static.jejuair.net/hpgg/resources/images/@temp/guide_bundle_06.png" alt="STEP 02" />
                </div>
                <div className="step-content">
                  <h3>STEP 02</h3>
                  <p>원하는 운임 옵션을 선택해 주세요.</p>
                </div>
              </div>

              {/* STEP 03 */}
              <div className="step-card">
                <div className="step-image">
                  <img src="https://static.jejuair.net/hpgg/resources/images/@temp/guide_bundle_07.png" alt="STEP 03" />
                </div>
                <div className="step-content">
                  <h3>STEP 03</h3>
                  <p>선택한 운임 옵션 상품의 서비스를 선택해 주세요.</p>
                </div>
              </div>

              {/* STEP 04 */}
              <div className="step-card">
                <div className="step-image">
                  <img src="https://static.jejuair.net/hpgg/resources/images/@temp/guide_bundle_08.png" alt="STEP 04" />
                </div>
                <div className="step-content">
                  <h3>STEP 04</h3>
                  <p>항공권 예매 시 운임 옵션 서비스 포함 내역을 확인해 주세요.</p>
                </div>
              </div>
            </div>
          </section>

  

          {/* 운임 옵션 구매시 혜택 */}
          <section className="purchase-benefits">
            <h2>운임 옵션 구매시 혜택</h2>
            
            <div className="benefits-grid">
              {/* 혜택 1 */}
              <div className="benefit-card">
                <div className="benefit-icon">
                  <span className="icon-discount">🏷️</span>
                </div>
                <div className="benefit-content">
                  <h3>혜택 1</h3>
                  <p>개별 구매 대비 최대 35% 할인</p>
                </div>
              </div>

              {/* 혜택 2 */}
              <div className="benefit-card">
                <div className="benefit-icon">
                  <span className="icon-service">🧳</span>
                </div>
                <div className="benefit-content">
                  <h3>혜택 2</h3>
                  <p>요금 걱정없는 추가 수하물 혜택과<br />그리고 빠른 우선 수속발 서비스까지!</p>
                </div>
              </div>

              {/* 혜택 3 */}
              <div className="benefit-card">
                <div className="benefit-icon">
                  <span className="icon-family">👨‍👩‍👧‍👦</span>
                </div>
                <div className="benefit-content">
                  <h3>혜택 3</h3>
                  <p>일행과 나란히 넓은 좌석 혜택</p>
                </div>
              </div>

              {/* 혜택 4 */}
              <div className="benefit-card">
                <div className="benefit-icon">
                  <span className="icon-meal">🍽️</span>
                </div>
                <div className="benefit-content">
                  <h3>혜택 4</h3>
                  <p>다양한 기내식 제공 혜택</p>
                </div>
              </div>
            </div>
          </section>

          {/* 운임 옵션 구성 */}
          <section className="fare-option-composition">
            <div className="section-header">
              <h2>운임 옵션 구성</h2>
              <span className="help-icon">?</span>
            </div>

            {/* 탭 메뉴 */}
            <div className="tab-menu">
              <button 
                className={`tab-button ${selectedTab === 'domestic' ? 'active' : ''}`}
                onClick={() => setSelectedTab('domestic')}
              >
                국내선
              </button>
              <button 
                className={`tab-button ${selectedTab === 'international' ? 'active' : ''}`}
                onClick={() => setSelectedTab('international')}
              >
                국제선
              </button>
            </div>

{/* 옵션 카드들 */}
<div className="option-cards">
  {selectedTab === 'domestic' ? (
    // 국내선 (스탠다드) 옵션들
    <>
      {/* 스탠다드 */}
      <div className="option-card">
        <h3>스탠다드</h3>
        <p>위탁수하물 기본 제공 서비스</p>
        
        <div className="service-list">
          <div className="service-item">
            <span className="service-icon">🎒</span>
            <span>기내수하물 10KG</span>
          </div>
          <div className="service-item">
            <span className="service-icon">🧳</span>
            <span>위탁수하물 15KG</span>
          </div>
        </div>
      </div>

      {/* 수하물 PLUS+ */}
      <div className="option-card recommended">
        <div className="recommended-badge">추천</div>
        <h3>수하물 PLUS+</h3>
        <p>추가 수하물과 일반 좌석 선택 서비스</p>
        
        <div className="service-list">
          <div className="service-item">
            <span className="service-icon">🎒</span>
            <span>기내수하물 10KG</span>
          </div>
          <div className="service-item">
            <span className="service-icon">🧳</span>
            <span>위탁수하물 20KG</span>
          </div>
          <div className="service-item">
            <span className="service-icon">💺</span>
            <span>일반 좌석 선택 무료</span>
          </div>
        </div>
      </div>

      {/* 수하물 좌석 PLUS+ */}
      <div className="option-card">
        <h3>수하물 좌석 PLUS+</h3>
        <p>추가 수하물 넓은 전 좌석을 한 번에!</p>
        
        <div className="service-list">
          <div className="service-item">
            <span className="service-icon">🎒</span>
            <span>기내수하물 10KG</span>
          </div>
          <div className="service-item">
            <span className="service-icon">🧳</span>
            <span>위탁수하물 20KG</span>
          </div>
          <div className="service-item">
            <span className="service-icon">💺</span>
            <span>전 좌석 선택 무료</span>
          </div>
          <div className="service-item">
            <span className="service-icon">⚡</span>
            <span>우선 체크인</span>
          </div>
        </div>
      </div>

      {/* 프리미엄 PLUS+ */}
      <div className="option-card">
        <h3>프리미엄 PLUS+</h3>
        <p>추가 수하물, 넓은 좌석과 최대 혜택</p>
        
        <div className="service-list">
          <div className="service-item">
            <span className="service-icon">🎒</span>
            <span>기내수하물 10KG</span>
          </div>
          <div className="service-item">
            <span className="service-icon">🧳</span>
            <span>위탁수하물 20KG</span>
          </div>
          <div className="service-item">
            <span className="service-icon">💺</span>
            <span>전 좌석 선택 무료</span>
          </div>
          <div className="service-item">
            <span className="service-icon">🎒</span>
            <span>우선 수하물 수취</span>
          </div>
          <div className="service-item">
            <span className="service-icon">🏢</span>
            <span>공항 수속 무료</span>
          </div>
        </div>
      </div>
    </>
  ) : (
    // 국제선 (비즈라이트) 옵션들
    <>
      {/* 플렉스 */}
      <div className="option-card">
        <h3>플렉스</h3>
        <p>위탁수하물 기본 제공 서비스</p>
        
        <div className="service-list">
          <div className="service-item">
            <span className="service-icon">🎒</span>
            <span>기내수하물 10KG</span>
          </div>
          <div className="service-item">
            <span className="service-icon">🧳</span>
            <span>위탁수하물 20KG</span>
          </div>
          <div className="service-item">
            <span className="service-icon">💺</span>
            <span>전 좌석 선택 무료</span>
          </div>
          <div className="service-item">
            <span className="service-icon">⚡</span>
            <span>우선 체크인</span>
          </div>
        </div>
      </div>

      {/* 수하물 PLUS+ (비즈라이트) */}
      <div className="option-card recommended">
        <div className="recommended-badge">추천</div>
        <h3>수하물 PLUS+</h3>
        <p>비즈니스 클래스 추가 수하물 서비스</p>
        
        <div className="service-list">
          <div className="service-item">
            <span className="service-icon">🎒</span>
            <span>기내수하물 15KG</span>
          </div>
          <div className="service-item">
            <span className="service-icon">🧳</span>
            <span>위탁수하물 30KG</span>
          </div>
          <div className="service-item">
            <span className="service-icon">💺</span>
            <span>전 좌석 선택 무료</span>
          </div>
          <div className="service-item">
            <span className="service-icon">⚡</span>
            <span>우선 체크인</span>
          </div>
          <div className="service-item">
            <span className="service-icon">🎒</span>
            <span>우선 수하물 수취</span>
          </div>
        </div>
      </div>

      {/* 수하물 좌석 PLUS+ (비즈라이트) */}
      <div className="option-card">
        <h3>수하물 좌석 PLUS+</h3>
        <p>최고급 비즈니스 서비스</p>
        
        <div className="service-list">
          <div className="service-item">
            <span className="service-icon">🎒</span>
            <span>기내수하물 15KG</span>
          </div>
          <div className="service-item">
            <span className="service-icon">🧳</span>
            <span>위탁수하물 40KG</span>
          </div>
          <div className="service-item">
            <span className="service-icon">💺</span>
            <span>전 좌석 선택 무료</span>
          </div>
          <div className="service-item">
            <span className="service-icon">⚡</span>
            <span>우선 체크인</span>
          </div>
          <div className="service-item">
            <span className="service-icon">🎒</span>
            <span>우선 수하물 수취</span>
          </div>
          <div className="service-item">
            <span className="service-icon">🏢</span>
            <span>공항 라운지 이용</span>
          </div>
          <div className="service-item">
            <span className="service-icon">🍽️</span>
            <span>무료 기내식</span>
          </div>
        </div>
      </div>

      {/* 프리미엄 PLUS+ (비즈라이트) */}
      <div className="option-card">
        <h3>프리미엄 PLUS+</h3>
        <p>VIP 전용 서비스와 최대 혜택</p>
        
        <div className="service-list">
          <div className="service-item">
            <span className="service-icon">🎒</span>
            <span>기내수하물 20KG</span>
          </div>
          <div className="service-item">
            <span className="service-icon">🧳</span>
            <span>위탁수하물 50KG</span>
          </div>
          <div className="service-item">
            <span className="service-icon">💺</span>
            <span>전 좌석 선택 무료</span>
          </div>
          <div className="service-item">
            <span className="service-icon">👑</span>
            <span>VIP 전용 체크인</span>
          </div>
          <div className="service-item">
            <span className="service-icon">🎒</span>
            <span>우선 수하물 수취</span>
          </div>
          <div className="service-item">
            <span className="service-icon">✨</span>
            <span>프리미엄 라운지 이용</span>
          </div>
          <div className="service-item">
            <span className="service-icon">🍽️</span>
            <span>무료 프리미엄 기내식</span>
          </div>
          <div className="service-item">
            <span className="service-icon">📶</span>
            <span>무료 와이파이</span>
          </div>
        </div>
      </div>
    </>
  )}
</div>

            {/* 주의사항 */}
            <div className="option-notice">
              <p>* 기내 휴대 수하물 10KG는 운임에 포함되어 기본제공되며, 표기된 위탁 수하물 허용량은 모든 위탁 수하물 포함 무게입니다.</p>
            </div>
          </section>

          {/* 구매 가능 대상 및 시간 */}
          <section className="purchase-info">
            <h2>구매 가능 대상 및 시간</h2>
            
            <div className="purchase-content">
              <p>항공운임 선택 시 운임 옵션을 함께 편리하고 개별 구매보다 저렴하게 이용해보세요.</p>
                <p>제주항공 모바일 웹/앱, PC에서 예약한 고객은 출발시간으로부터 24시간 전까지 구매 가능합니다.</p>
                <p>운임 옵션은 항공권 예약 진행 시 구매 가능하며, 예약/발권 완료 후에는 구매할 수 없습니다.</p>
                <p>운임 옵션은 노선별로 제공 여부가 다를 수 있으며, 일부 노선에서는 특정 옵션이 제공되지 않거나 일부 옵션만 운영될 수 있습니다.</p>
                <p>제공되는 운임 옵션 및 할인율은 수시로 변경될 수 있으며, 별도 고지 없이 조정될 수 있습니다.</p>
                <p>예매 시점의 실제 제공 옵션 및 적용 가능한 할인율은 예매 화면에서 최종 확인해주시기 바랍니다.</p>
                <p>운임 옵션은 포인트 항공권 발권 시 구매할 수 없습니다.</p>
                <p>(구)좌석 + 수하물 세트의 정보 확인이 필요하다면, 아래 버튼을 클릭해서 확인이 가능합니다.</p>
    
              <div className="info-button">
                <button className="btn-info">(구) 좌석 + 수하물 세트</button>
              </div>
            </div>
          </section>
                  {/* 운임 옵션 안내사항 */}
          <section className="fare-option-notice">
            <h2>운임 옵션 안내사항</h2>
            <div className="notice-content">
              <ul>
                <li>제주항공 모바일 웹/앱, PC에서 예약 고객에 한 해 출발시간으로부터 24시간 전까지 구매 가능합니다.</li>
                <li>예약/발권 후에는 별도 구매할 수 없습니다.</li>
                <li>포인트 항공권 예약 시 구매할 수 없습니다.</li>
                <li>동일 예약 건 내 포함된 탑승객 전원 구매 가능하며, 일부 탑승객만 구매할 수 없습니다.</li>
                <li>운임 옵션 단독 취소는 불가하며, 항공권 예약 취소 시 구매한 옵션은 자동 취소됩니다.</li>
                <li>운임 옵션 일부 서비스만 취소 또는 환불되지 않습니다.</li>
                <li>운임 옵션 환불규정은 별도 수수료가 발생하지 않습니다.</li>
                <li>운임 옵션에 포함된 서비스 외 추가 구매한 부가서비스는 부가서비스 취소규정을 따릅니다.</li>
                <li>예약 변경 시 기존의 구매한 운임 옵션은 변경할 운임의 종류에 따라 아래와 같이 처리됩니다.</li>
                <li>동일한 종류의 운임으로 변경 시 기존의 운임 옵션은 유지됩니다. 단, 기존 여정 또는 변경할 여정이 출발시간으로부터 24시간 이내일 경우 자동 취소됩니다.</li>
                <li>다른 종류의 운임으로 변경 시 기존의 구매한 운임 옵션은 자동 취소되며 재구매는 불가합니다.</li>
                <li>운임 옵션은 노선별로 제공 여부가 다를 수 있으며, 일부 노선에서는 특정 옵션이 제공되지 않거나 일부 옵션만 운영될 수 있습니다.</li>
                <li>제공되는 운임 옵션 및 할인율은 수시로 변경될 수 있으며, 별도 고지 없이 조정될 수 있습니다.</li>
                <li>예매 시점의 실제 제공 옵션 및 적용 가능한 할인율은 예매 화면에서 최종 확인해주시기 바랍니다.</li>
                <li>모든 운임 옵션 금액은 한국 출발일 경우에만 원화로 적용됩니다.
                    이 외(대한민국 출발 외)의 경우 USD로 적용되며, 현지 통화(엔화, 위안화, 페소, 루피아 등)는 USD 판매가 기준으로 변환됩니다.</li>
              </ul>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FareOption;