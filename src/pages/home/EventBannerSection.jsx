import React, { useState } from 'react';
import '../../css/home/EventBannerSection.css';

// URL_LINK 유틸리티 함수
const URL_LINK = {
  getI18Url: (url) => {
    console.log('Navigating to:', url);
    // 실제 라우팅 로직 구현
  }
};

function EventBannerSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 이벤트 배너 데이터
  const eventBanners = [
    {
      id: 1,
      eventNo: '0000001982',
      image: 'https://static.jejuair.net/cms/images/banner_image/20250731072516148.png',
      title1: '싱가포르 마담 투소',
      title2: '입장권 30% 할인',
      color: '#ffffff'
    },
    {
      id: 2,
      eventNo: '0000002723',
      image: 'https://static.jejuair.net/cms/images/banner_image/20250804154742985.jpg',
      title1: '4대 면세점',
      title2: '제휴 혜택 안내',
      color: ''
    },
    {
      id: 3,
      eventNo: '0000002576',
      image: 'https://static.jejuair.net/cms/images/banner_image/20250731084902949.jpg',
      title1: '인도네시아 발리&바탐',
      title2: '제휴처 할인 혜택!',
      color: ''
    },
    {
      id: 4,
      eventNo: '0000003380',
      image: 'https://static.jejuair.net/cms/images/banner_image/20250923173849314.png',
      title1: '9월 48시간 타임어택',
      title2: '국내/국제 총 52개 노선 특가!',
      color: '#ffffff'
    },
    {
      id: 5,
      eventNo: '0000003369',
      image: 'https://static.jejuair.net/cms/images/banner_image/20250924153747313.png',
      title1: '일본 시즈오카 특가전',
      title2: '최대 83% 할인!',
      color: '#ffffff'
    },
    {
      id: 6,
      eventNo: '0000003328',
      image: 'https://static.jejuair.net/cms/images/banner_image/20250918100801573.png',
      title1: '9~12월 출발',
      title2: '마카오 50% 할인!',
      color: ''
    }
  ];

  const handlePrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => prev === 0 ? eventBanners.length - 1 : prev - 1);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => prev === eventBanners.length - 1 ? 0 : prev + 1);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const slideWidth = 341; // 각 슬라이드의 너비 (330px + 8px margin)
  const translateX = -currentSlide * slideWidth;
  return (
    <section className="section_exception_boon">
      <div className="NewBannerThin-list">
        <div className="title">
          <h3 className="title__section">특별한 혜택을 확인해 보세요.</h3>
          <button 
            type="button" 
            className="title_more_btn"
            onClick={() => URL_LINK.getI18Url('/event/event.do')}
          >
            <span>전체보기</span>
          </button>
        </div>
        <div 
          className="swiper-container NewBannerThin-pc swiper-container-initialized swiper-container-horizontal"
          data-carousel="NewBannerThin"
        >
          <div 
            className="swiper-wrapper" 
            style={{ 
              transitionDuration: isTransitioning ? '300ms' : '0ms',
              transform: `translate3d(${translateX}px, 0px, 0px)` 
            }}
          >
            {eventBanners.map((banner, index) => (
              <a
                key={banner.id}
                href="javascript:void(0);" 
                onClick={() => URL_LINK.getI18Url(`/event/eventDetail.do?eventNo=${banner.eventNo}`)}
                className="swiper-slide" 
                style={{ width: '330px' }} 
                data-swiper-slide-index={index}
              >
                <div 
                  className="carousel_bg event-banner-item"
                  style={{ 
                    backgroundImage: `url(${banner.image})` 
                  }}
                >
                  <div className="label-wrap">
                    <span className="label-wrap__item label-wrap__item--type2 eng">NEW</span>
                  </div>
                  <div className="event-banner">
                    <p className="event-banner__title" style={{ color: banner.color }}>
                      {banner.title1}
                    </p>
                    <p className="event-banner__title" style={{ color: banner.color }}>
                      {banner.title2}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
          
          <div className="carousel__pagination1 pc-only swiper-pagination-bullets">
            {eventBanners.map((_, index) => (
              <span 
                key={index}
                className={`swiper-pagination-bullet ${index === currentSlide ? 'swiper-pagination-bullet-active' : ''}`}
                onClick={() => {
                  if (isTransitioning) return;
                  setIsTransitioning(true);
                  setCurrentSlide(index);
                  setTimeout(() => setIsTransitioning(false), 300);
                }}
              />
            ))}
          </div>
          
          <div className="pagination-nom-gp mobile-only">
            <div className="carousel__pagination1-2" />
          </div>
          
          <span className="swiper-notification" aria-live="assertive" aria-atomic="true" />
        </div>
        
        <button 
          type="button" 
          className="carousel__button_new-next2 show" 
          tabIndex="0" 
          role="button"
          aria-label="Next slide"
          onClick={handleNextSlide}
          disabled={isTransitioning}
        >
          &gt;
        </button>
        <button 
          type="button" 
          className="carousel__button_new-prev2 show" 
          tabIndex="0" 
          role="button"
          aria-label="Previous slide"
          onClick={handlePrevSlide}
          disabled={isTransitioning}
        >
          &lt;
        </button>
      </div>
    </section>
  );
}

export default EventBannerSection;
