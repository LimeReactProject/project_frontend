import React, { useState } from 'react';
import '../../css/home/PopularRouteSection.css';

// URL_LINK 유틸리티 함수
const URL_LINK = {
  getI18Url: (url) => {
    console.log('Navigating to:', url);
    // 실제 라우팅 로직 구현
  }
};

function PopularRouteSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 인기 노선 데이터
  const popularRoutes = [
    {
      id: 1,
      url: 'https://www.jejuair.net/ko/ibe/booking/Availability.do?tripType=R&pcode=나만의마카오09&depStn=ICN&arrStn=MFM&depDate=2025-10-16&arrDate=2025-10-23&depStn=ICN&arrStn=MFM&depDate=2025-10-15&arrDate=2025-11-30&recommTckt=recommTckt',
      name: '서울(인천)-마카오',
      price: '72,400',
      date: '2025.10.15 ~ 2025.11.30',
      image: 'https://static.jejuair.net/cms/images/immigration_card/20250917171651861.png',
      hidden: '마카오'
    },
    {
      id: 2,
      url: '/ko/ibe/booking/Availability.do?tripType=R&depStn=ICN&arrStn=SIN&depDate=2025-10-15&arrDate=2025-11-30&recommTckt=recommTckt',
      name: '서울(인천)-싱가포르',
      price: '94,700',
      date: '2025.10.15 ~ 2025.11.30',
      image: 'https://static.jejuair.net/cms/images/immigration_card/20250917171846523.png',
      hidden: '싱가포르'
    },
    {
      id: 3,
      url: '/ko/ibe/booking/Availability.do?tripType=R&depStn=ICN&arrStn=CNX&depDate=2025-10-15&arrDate=2025-11-30&recommTckt=recommTckt',
      name: '서울(인천)-치앙마이',
      price: '84,100',
      date: '2025.10.15 ~ 2025.11.30',
      image: 'https://static.jejuair.net/cms/images/immigration_card/20250917171758808.png',
      hidden: '치앙마이'
    },
    {
      id: 4,
      url: '/ko/ibe/booking/Availability.do?tripType=R&depStn=TAE&arrStn=CJU&depDate=2025-10-15&arrDate=2025-10-31&recommTckt=recommTckt',
      name: '대구-제주',
      price: '19,600',
      date: '2025.10.15 ~ 2025.10.31',
      image: 'https://static.jejuair.net/cms/images/immigration_card/20250924185836556.png',
      hidden: '대구제주'
    },
    {
      id: 5,
      url: '/ko/ibe/booking/Availability.do?tripType=R&depStn=PUS&arrStn=KHH&depDate=2025-10-15&arrDate=2025-11-30&recommTckt=recommTckt',
      name: '부산-가오슝',
      price: '79,900',
      date: '2025.10.15 ~ 2025.11.30',
      image: 'https://static.jejuair.net/cms/images/immigration_card/20250917172518718.png',
      hidden: '부산-가오슝'
    },
    {
      id: 6,
      url: '/ko/ibe/booking/Availability.do?tripType=R&depStn=PUS&arrStn=PVG&depDate=2025-11-01&arrDate=2025-11-30&recommTckt=recommTckt',
      name: '부산-상하이(푸동)',
      price: '91,500',
      date: '2025.11.01 ~ 2025.11.30',
      image: 'https://static.jejuair.net/cms/images/immigration_card/20250917172602857.png',
      hidden: '부산-상해'
    },
    {
      id: 7,
      url: '/ko/ibe/booking/Availability.do?tripType=R&depStn=ICN&arrStn=KOJ&depDate=2025-10-15&arrDate=2025-11-30&recommTckt=recommTckt',
      name: '서울(인천)-가고시마',
      price: '101,500',
      date: '2025.10.15 ~ 2025.11.30',
      image: 'https://static.jejuair.net/cms/images/immigration_card/20250731090954600.png',
      hidden: '가고시마'
    }
  ];

  const handlePrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => Math.max(0, prev - 1));  // 한 개씩 이동
    setTimeout(() => setIsTransitioning(false), 300);
};

const handleNextSlide = () => {
  if (isTransitioning) return;
  setIsTransitioning(true);
  // 4개씩 보이므로 마지막 4개가 화면에 보이는 위치까지만 이동
  const maxSlide = Math.max(0, popularRoutes.length - 4);
  setCurrentSlide(prev => Math.min(maxSlide, prev + 1));
  setTimeout(() => setIsTransitioning(false), 300);
};
 
  const slideWidth = 245; // 각 슬라이드의 너비 (220px + 8px gap)
  const translateX = -currentSlide * slideWidth;

  return (
    <section className="section_route_popularity">
      <div className="routepopularity-list">
        <div className="title">
          <h3 className="title__section">지금 뜨는 인기 노선을 확인해 보세요.</h3>
          <div className="title_info_txt">
            <span className="orange">*</span>
            <span>1인 편도총액 기준</span>
          </div>
        </div>
        
        <div 
          className="swiper-container swiper-container-initialized swiper-container-horizontal" 
          data-carousel="RoutePopularity"
        >
          <div 
            className="swiper-wrapper" 
            style={{ 
              transitionDuration: isTransitioning ? '300ms' : '0ms',
              transform: `translate3d(${translateX}px, 0px, 0px)` 
            }}
          >
            {popularRoutes.map((route, index) => (
              <a 
                key={route.id}
                href={route.url}
                className="swiper-slide" 
                style={{ marginRight: '16px' }}
                onClick={(e) => {
                  e.preventDefault();
                  URL_LINK.getI18Url(route.url);
                }}
              >
                <div 
                  className="carousel_bg" 
                  style={{ backgroundImage: `url(${route.image})` }}
                >
                  <div className="hidden">{route.hidden}</div>
                </div>
                <div className="txt-wrap">
                  <div className="name">{route.name}</div>
                  <div className="text">
                    <span className="price_txt">{route.price}</span>
                    <span className="unit">원</span>
                    <span className="tilde">~</span>
                  </div>
                  <div className="date">{route.date}</div>
                </div>
              </a>
            ))}
          </div>
          
          <span className="swiper-notification" aria-live="assertive" aria-atomic="true" />
        </div>
        
        <button 
          type="button" 
          className={`carousel__button_route_popularity-prev2 show ${currentSlide === 0 ? 'swiper-button-disabled' : ''}`}
          tabIndex="0" 
          role="button"
          aria-label="Previous slide" 
          aria-disabled={currentSlide === 0}
          onClick={handlePrevSlide}
          disabled={currentSlide === 0}
        >
          &lt;
        </button>
        <button 
          type="button" 
          className={`carousel__button_route_popularity-next2 show ${currentSlide === popularRoutes.length - 1 ? 'swiper-button-disabled' : ''}`}
          tabIndex="0"
          role="button" 
          aria-label="Next slide" 
          aria-disabled={currentSlide === popularRoutes.length - 1}
          onClick={handleNextSlide}
          disabled={currentSlide === popularRoutes.length - 1}
        >
          &gt;
        </button>
      </div>
    </section>
  );
}

export default PopularRouteSection;
