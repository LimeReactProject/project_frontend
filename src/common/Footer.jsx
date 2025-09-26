import React from 'react';
import '../css/common/Footer.css';

function Footer() {
  return (
    <footer className="footer-wrap" role="contentinfo">
      <div className="footer-wrap-customer mobile-only">
        <div className="footer-wrap-customer__head">고객센터 1599-1500 (09:00~19:00)</div>
        <div className="footer-wrap-customer__info">
          <strong className="footer-wrap-customer__tel">
            1599-1500
          </strong>
          <span className="footer-wrap-customer__time">09:00 ~ 19:00</span>
        </div>
      </div>
      
      <ul className="responsive-accordion responsive-accordion--line">
        <li className="responsive-accordion__item is-open">
          <div 
            className="responsive-accordion__header" 
            id="accordion-header-1"
            aria-controls="accordion-panel-2" 
            aria-expanded={true} 
            style={{cursor: 'default'}}
          >
            <strong className="responsive-accordion__title">
              제주항공
            </strong>
          </div>
          <div 
            className="responsive-accordion__panel"
            aria-labelledby="accordion-header-1" 
            style={{display: 'block'}}
          >
            <ul className="responsive-accordion__list">
              <li>
                <a href="#" className="footer__top-link">
                  회사소개
                </a>
              </li>
              <li>
                <a href="#" className="footer__top-link">
                  투자정보
                </a>
              </li>
              <li>
                <a href="#" className="footer__top-link">
                  채용안내
                </a>
              </li>
              <li>
                <a href="#" className="button-footer">ESG 경영</a>
              </li>
              <li><a href="/ko/terms/page/ccm.do">소비자중심경영</a></li>
            </ul>
          </div>
        </li>
        
        <li className="responsive-accordion__item is-open">
          <div 
            className="responsive-accordion__header" 
            id="accordion-header-3"
            aria-controls="accordion-panel-4" 
            aria-expanded={true} 
            style={{cursor: 'default'}}
          >
            <strong className="responsive-accordion__title">
              약관 및 안내
            </strong>
          </div>
          <div 
            className="responsive-accordion__panel"
            aria-labelledby="accordion-header-3" 
            style={{display: 'block'}}
          >
            <ul className="responsive-accordion__list">
              <li>
                <a href="#" className="footer__top-link">
                  이용약관
                </a>
              </li>
              <li>
                <a href="#" className="footer__top-link">
                  운송약관 및 기타
                </a>
              </li>
              <li>
                <a href="#" className="footer__top-link">
                  <strong>개인정보처리방침</strong>
                </a>
              </li>
            </ul>
          </div>
        </li>
        
        <li className="responsive-accordion__item is-open">
          <div 
            className="responsive-accordion__header" 
            id="accordion-header-5"
            aria-controls="accordion-panel-6" 
            aria-expanded={true} 
            style={{cursor: 'default'}}
          >
            <strong className="responsive-accordion__title">
              기타 안내
            </strong>
          </div>
          <div 
            className="responsive-accordion__panel"
            aria-labelledby="accordion-header-5" 
            style={{display: 'block'}}
          >
            <ul className="responsive-accordion__list">
              <li>
                <a href="/terms/page/transportationServicePlan.do">
                  항공교통이용자 서비스 계획
                </a>
              </li>
              <li>
                <a href="https://www.avsec365.or.kr/">
                  항공위험물안내
                </a>
              </li>
              <li>
                <a href="http://static.jejuair.net/cms/images/file_upload/20230804155945599.pdf">
                  항공교통이용자 피해구제 계획
                </a>
              </li>
              <li>
                <a href="http://static.jejuair.net/cms/images/file_upload/20250829114537504.pdf">
                  항공안전투자공시
                </a>
              </li>
              <li>
                <a href="/prepare/eDocument/main.do">
                  사전 서약서
                </a>
              </li>
            </ul>
          </div>
        </li>
        
        <li className="responsive-accordion__item is-open">
          <div 
            className="responsive-accordion__header" 
            id="accordion-header-7"
            aria-controls="accordion-panel-8" 
            aria-expanded={true} 
            style={{cursor: 'default'}}
          >
            <strong className="responsive-accordion__title">
              마케팅/제휴
            </strong>
          </div>
          <div 
            className="responsive-accordion__panel"
            aria-labelledby="accordion-header-7" 
            style={{display: 'block'}}
          >
            <ul className="responsive-accordion__list">
              <li>
                <a href="mailto:partnership@jejuair.net">
                  광고 및 제휴 문의
                </a>
              </li>
              <li>
                <a href="#" className="block">
                  이메일 무단 수집 거부
                </a>
              </li>
              <li>
                <a href="/cabinEducation/service/eduWing.do" className="button-footer">
                  에듀윙
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      
      {/* 두 번째 줄 - 기업/여행사 서비스와 사이트맵 */}
      <ul className="responsive-accordion responsive-accordion--line">
        <li className="responsive-accordion__item is-open">
          <div 
            className="responsive-accordion__header" 
            id="accordion-header-9"
            aria-controls="accordion-panel-10" 
            aria-expanded={true} 
            style={{cursor: 'default'}}
          >
            <strong className="responsive-accordion__title">
              기업/여행사 서비스
            </strong>
          </div>
          <div 
            className="responsive-accordion__panel"
            aria-labelledby="accordion-header-9" 
            style={{display: 'block'}}
          >
            <ul className="responsive-accordion__list">
              <li>
                <a href="https://cargo.jejuair.net/cargo/main.do" target="_blank" className="button-footer">
                  Cargo
                </a>
              </li>
              <li>
                <a href="#" className="util__link company">
                  기업 우대
                </a>
              </li>
              <li>
                <a href="https://jj.jejuair.net/dom/main.do">
                  국내선 여행사 우대
                </a>
              </li>
              <li>
                <a href="https://7c.jejuair.net/int/main.do">
                  국제선 여행사 우대
                </a>
              </li>
            </ul>
          </div>
        </li>
        
        <li className="responsive-accordion__item responsive-accordion__item--link">
          <div className="responsive-accordion__header">
            <strong className="responsive-accordion__title">
              <a href="#" className="footer__top-link">
                사이트맵
              </a>
            </strong>
          </div>
        </li>
        
        <li className="responsive-accordion__item responsive-accordion__item--ccm pc-only">
          <a href="/ko/terms/page/ccm.do">
            <img
              src="https://static.jejuair.net/hpgg/resources/images/banner/banner_footer_CCM.png" 
              alt="CCM 인증마크"
            />
          </a>
        </li>
      </ul>
      
      <ul className="responsive-accordion responsive-accordion--column">
        <li className="responsive-accordion__item is-open">
          <div className="responsive-accordion__left">
            <div 
              className="responsive-accordion__header" 
              id="accordion-header-1"
              aria-controls="accordion-panel-2" 
              aria-expanded={true} 
              style={{cursor: 'default'}}
            >
              <strong className="responsive-accordion__title">(주)제주항공</strong>
            </div>
            <div 
              className="responsive-accordion__panel"
              aria-labelledby="accordion-header-1" 
              style={{display: 'block'}}
            >
              <ul className="footer-wrap__info footer-wrap__info--type2">
                <li>대표이사 : 김이배</li>
                <li>사업자등록번호 : 616-81-50527</li>
                <li>통신판매업신고 : 제주 2006-125호</li>
                <li>호스팅 사업자 : AWS</li>
              </ul>
              <address>
                주소 : 제주특별자치도 제주시 신대로 64 <br className="mobile-only" />(연동, 건설공제회관 3층)
              </address>
              <ul className="footer-wrap__info">
                <li className="pc-only">
                  고객센터 : 1599-1500 (09:00 ~ 19:00)
                </li>
                <li>
                  <a href="/ko/customerService/csCenter/qnaForm.do" target="_blank">
                    문의 : jejuair.help@jejuair.net
                  </a>
                </li>
              </ul>
              <div className="footer-wrap__copy pc-only">
                Copyright ⓒ Jeju Air. All Rights Reserved.
              </div>
            </div>
          </div>
          
          <div className="responsive-accordion__right">
            {/* SNS 링크들을 (주)제주항공과 같은 라인으로 이동 */}
            <ul className="footer-wrap__sns-list">
              <li>
                <a href="https://www.youtube.com/@jejuair_official" target="_blank" className="footer-wrap__sns">
                  <i className="icon">
                    <img 
                      src="https://static.jejuair.net/cms/images/sns_ch/20250804165831645.png"
                      loading="lazy"
                      alt="YouTube"
                    />
                  </i>
                  <span className="hidden">https://www.youtube.com/@jejuair_official</span>
                </a>
              </li>
              
              <li>
                <a href="https://instagram.com/jejuair_official" target="_blank" className="footer-wrap__sns">
                  <i className="icon">
                    <img 
                      src="https://static.jejuair.net/cms/images/sns_ch/20250804165841751.png"
                      loading="lazy"
                      alt="Instagram"
                    />
                  </i>
                  <span className="hidden">https://instagram.com/jejuair_official</span>
                </a>
              </li>
              
              <li>
                <a href="https://www.tiktok.com/@jejuair_official" target="_blank" className="footer-wrap__sns">
                  <i className="icon">
                    <img 
                      src="https://static.jejuair.net/cms/images/sns_ch/20250804165850759.png"
                      loading="lazy"
                      alt="TikTok"
                    />
                  </i>
                  <span className="hidden">https://www.tiktok.com/@jejuair_official</span>
                </a>
              </li>
              
              <li>
                <a href="https://www.facebook.com/funjejuair/" target="_blank" className="footer-wrap__sns">
                  <i className="icon">
                    <img 
                      src="https://static.jejuair.net/cms/images/sns_ch/20250804165859889.png"
                      loading="lazy"
                      alt="Facebook"
                    />
                  </i>
                  <span className="hidden">https://www.facebook.com/funjejuair/</span>
                </a>
              </li>
            </ul>
            
            {/* QR 코드를 SNS 아래로 이동 */}
            <div className="pc-only">
              <div className="footer-wrap__qr-code">
                <div>
                  앱을 다운로드하고<br />앱전용 혜택을<br />받아보세요!
                </div>
                <em>
                  <img 
                    src="https://static.jejuair.net/hpgg/resources/images/icon/icon-app-down-qr.png" 
                    alt="앱 다운로드 QR코드"
                  />
                </em>
              </div>
            </div>
            
            <div className="footer-wrap__copy mobile-only">
              Copyright ⓒ Jeju Air. All Rights Reserved.
            </div>
            
            <div className="footer-wrap__bnr mobile-only">
              <a href="/terms/page/ccm.do" className="footer-wrap__bnr-item">
                <span>소비자중심경영 인증기업</span>
              </a>
            </div>
          </div>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
