import React, { useState } from 'react';
import '../../css/home/MemberBenefitSection.css';

// URL_LINK 유틸리티 함수
const URL_LINK = {
  getI18Url: (url) => {
    console.log('Navigating to:', url);
    // 실제 라우팅 로직 구현
  }
};

function MemberBenefitSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 멤버 혜택 데이터
  const memberBenefits = [
    {
      id: 1,
      url: '/event/eventDetail.do?eventNo=0000002809',
      title: 'J 멤버스 등급제도 개편',
      subtitle: '#더욱 강력해진 등급별 혜택',
      background: '#ffd5b4',
      image: 'https://static.jejuair.net/hpgg/resources/images/@temp/section_member_01.png'
    },
    {
      id: 2,
      url: '/memberBenefit/refreshPoint/main.do',
      title: '떠날수록 쌓이는 J 포인트',
      subtitle: '#포인트로 떠나는 여행',
      background: '#dacbff',
      image: 'https://static.jejuair.net/hpgg/resources/images/@temp/section_member_02.png'
    },
    {
      id: 3,
      url: '/event/eventDetail.do?eventNo=0000003190',
      title: '제주항공 멤버십 혜택전',
      subtitle: '#스포츠 매니아 #골프 여행 #반려동물과 함께',
      background: '#ffc5c5',
      image: 'https://static.jejuair.net/hpgg/resources/images/@temp/section_member_03.png'
    },
    {
      id: 4,
      url: '/additionalService/service/gifticket.do',
      title: '쉽고 간편한 여행의 시작, 기프티켓',
      subtitle: '#여행을 선물해 보세요.',
      background: '#b8e3ff',
      image: 'https://static.jejuair.net/hpgg/resources/images/@temp/section_member_04.png'
    }
  ];

  const handlePrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => prev === 0 ? memberBenefits.length - 1 : prev - 1);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => prev === memberBenefits.length - 1 ? 0 : prev + 1);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const slideWidth = 505; // 각 슬라이드의 너비 (CSS에서 min-width: 490px)
  const translateX = -currentSlide * slideWidth;
  return (
    <section className="section_member_boon" data-scroll-btn="active">
      <div className="member_boon-list">
        <div className="title">
          <h3 className="title__section">J 멤버스 전용 혜택을 만나보세요.</h3>
        </div>
        <div 
          className="swiper-container member_boon-pc swiper-container-initialized swiper-container-horizontal"
          data-carousel="MemberBoon"
        >
          <div 
            className="swiper-wrapper" 
            style={{ 
              transitionDuration: isTransitioning ? '300ms' : '0ms',
              transform: `translate3d(${translateX}px, 0px, 0px)` 
            }}
          >
            {memberBenefits.map((benefit, index) => (
              <a 
                key={benefit.id}
                href="javascript:void(0);" 
                onClick={() => URL_LINK.getI18Url(benefit.url)}
                className="swiper-slide" 
                style={{ width: '140px', marginRight: '20px' }}
              >
                <div className="slide_boon_inner_gp" style={{ background: benefit.background }}>
                  <div 
                    className="carousel_bg"
                    style={{ 
                      backgroundImage: `url(${benefit.image})` 
                    }}
                  />
                  <div className="txt-wrap">
                    <div className="name">{benefit.title}</div>
                    <div className="text">
                      <span className="inner_stxt">{benefit.subtitle}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          
          <div className="carousel__pagination2 swiper-pagination-bullets">
            {memberBenefits.map((_, index) => (
              <span 
                key={index}
                className={`swiper-pagination-bullet ${index === currentSlide ? 'swiper-pagination-bullet-active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
          
          <span className="swiper-notification" aria-live="assertive" aria-atomic="true" />
        </div>
        
        <button 
          type="button" 
          className={`carousel__button__member_boon-prev2 show ${currentSlide === 0 ? 'swiper-button-disabled' : ''}`}
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
          className={`carousel__button__member_boon-next2 show ${currentSlide === memberBenefits.length - 1 ? 'swiper-button-disabled' : ''}`}
          tabIndex="0"
          role="button" 
          aria-label="Next slide" 
          aria-disabled={currentSlide === memberBenefits.length - 1}
          onClick={handleNextSlide}
          disabled={currentSlide === memberBenefits.length - 1}
        >
          &gt;
        </button>
      </div>
    </section>
  );
}

export default MemberBenefitSection;
