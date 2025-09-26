import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import '../../css/home/MainVisualSwiper.css';
import FlightSearch from './FlightSearch';
import SearchModal from './SearchModal';
import DateModal from './DateModal';

// URL_LINK 유틸리티 함수들
const URL_LINK = {
  getI18Url: (url) => {
    console.log('Navigating to:', url);
    // 실제 라우팅 로직 구현
  }
};


function MainVisualSwiper() {
  // 모달 상태 관리
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [modalType, setModalType] = useState('departure');

  // 슬라이드 데이터
  const slides = [
    {
      id: 1,
      title: "인천-싱가포르 신규취항\n매일 1회 운항중",
      image: "https://static.jejuair.net/cms/images/banner_image/20250731072356272.png",
      eventNo: "0000002592"
    },
    {
      id: 2,
      title: "부산 - 타이베이 증편\n11~3월 판매 오픈!",
      image: "https://static.jejuair.net/cms/images/banner_image/20250922133649145.jpg",
      eventNo: "0000003229"
    },
    {
      id: 3,
      title: "국내 ·동·서양의 만남, 마카오\n인천 출발 매일 1회 운항",
      image: "https://static.jejuair.net/cms/images/banner_image/20250918080526887.jpg",
      eventNo: "0000003328"
    },
    {
      id: 4,
      title: "일본 속 작은 유럽, 하코다테 \n11~3월 출발 판매 오픈!",
      image: "https://static.jejuair.net/cms/images/banner_image/20250908161003044.jpg",
      eventNo: "0000003320"
    },
    {
      id: 5,
      title: "인기 여행지 상하이\n11~3월 출발 판매 오픈!",
      image: "https://static.jejuair.net/cms/images/banner_image/20250801181553945.jpg",
      eventNo: "0000002801"
    }
  ];

  return (
    <>
      <div className="main-visual-swiper__wrap">
        <FlightSearch 
          onOpenModal={({ type }) => {
            setModalType(type);
            setShowLocationModal(true);
          }}
          onOpenDateModal={({ type }) => {
            setModalType(type);
            setShowDateModal(true);
          }}
        />
      {/* PC 버전 스와이퍼 */}
      <div className="main-visual-swiper__container pc-only">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 3500,  // 사진 전환시간
            disableOnInteraction: false,
          }}
          loop={true}
          speed={1000}   // 사진넘어가는 속도
          className="main-visual-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <a 
                href="#" 
                onClick={() => URL_LINK.getI18Url(`/event/eventDetail.do?eventNo=${slide.eventNo}`)} 
                id={`main-carousel__text_${slide.id}`}
                data-event-no={slide.eventNo}
              >
                <div className="main-visual-swiper__bg">
                  <img src={slide.image} alt={slide.title} />
                </div>
                <div className="main-visual-swiper__title title">
                  {slide.title.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < slide.title.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 모바일 버전 스와이퍼 */}
      <div className="main-visual-swiper__container mobile-only">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={500}
          className="main-visual-swiper-mobile"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <a 
                href="#" 
                onClick={() => URL_LINK.getI18Url(`/event/eventDetail.do?eventNo=${slide.eventNo}`)} 
                id={`main-carousel__text_${slide.id}`}
                data-event-no={slide.eventNo}
              >
                <div className="main-visual-swiper__bg">
                  <img src={slide.image} alt={slide.title} />
                </div>
                <div className="main-visual-swiper__title title">
                  {slide.title.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < slide.title.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      </div>
      
      {/* SearchModal, DateModal  */}
      <SearchModal 
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        modalType={modalType}
      />
      
      <DateModal 
        isOpen={showDateModal}
        onClose={() => setShowDateModal(false)}
        modalType={modalType}
      />
    </>
  );
}

export default MainVisualSwiper;