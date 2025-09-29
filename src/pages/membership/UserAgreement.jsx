import Header from '../../common/Header';
import Footer from '../../common/Footer';
import '../../css/membership/UserAgreement.css';
import Modal from 'react-modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserAgreement() {

    const nav = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState('');
    const [modalType, setModalType] = useState(''); // 'all' 또는 'individual'
    
    // 체크박스 상태 관리
    const [agreeAll, setAgreeAll] = useState(false);
    const [agreeService, setAgreeService] = useState(false);
    const [agreePrivacy, setAgreePrivacy] = useState(false);
    const [agreeMarketing, setAgreeMarketing] = useState(false);


    const openModal = (title, content, type) => {
        console.log('모달 열기 시도:', title);
        setModalTitle(title);
        setModalContent(content);
        setModalType(type);
        setIsModalOpen(true);
    };

    // 체크박스 클릭 처리
    const handleCheckboxClick = (type) => {
        if (type === 'all') {
            if (agreeAll) {
                // 체크된 상태면 해제
                setAgreeAll(false);
                setAgreeService(false);
                setAgreePrivacy(false);
                setAgreeMarketing(false);
            } else {
                // 체크 안된 상태면 모달 열기
                openModal('전체동의', allTermsContent, 'all');
            }
        } else if (type === 'service') {
            if (agreeService) {
                setAgreeService(false);
                setAgreeAll(false); // 개별 약관 해제 시 전체동의도 해제
            } else {
                openModal('서비스약관', termsContent.service, 'service');
            }
        } else if (type === 'privacy') {
            if (agreePrivacy) {
                setAgreePrivacy(false);
                setAgreeAll(false); // 개별 약관 해제 시 전체동의도 해제
            } else {
                openModal('개인정보 수집,이용동의', termsContent.privacy, 'privacy');
            }
        } else if (type === 'marketing') {
            if (agreeMarketing) {
                setAgreeMarketing(false);
                setAgreeAll(false); // 개별 약관 해제 시 전체동의도 해제
            } else {
                openModal('마케딩 정보 수신 동의', termsContent.marketing, 'marketing');
            }
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalTitle('');
        setModalContent('');
        setModalType('');
    };

    // 전체동의 처리
    const handleAgreeAll = () => {
        setAgreeAll(true);
        setAgreeService(true);
        setAgreePrivacy(true);
        setAgreeMarketing(true);
        closeModal();
    };

    // 개별 동의 처리
    const handleAgreeIndividual = () => {
        if (modalType === 'service') {
            setAgreeService(true);
        } else if (modalType === 'privacy') {
            setAgreePrivacy(true);
        } else if (modalType === 'marketing') {
            setAgreeMarketing(true);
        }
        closeModal();
    };

    // 필수 약관 체크 여부 확인 (서비스 약관 + 개인정보 약관)
    const isRequiredTermsChecked = agreeService && agreePrivacy;  

    // 약관 내용들
    const termsContent = {
        service: `
            <h4>제1조(목적)</h4>
            <p>이 약관은 ㈜제주항공(이하 "제주항공"이라 합니다)이 운영하는 제주항공 인터넷 웹사이트에서 제공하는 인터넷 관련 서비스를 이용함에 있어 제주항공과 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>
            
            <h4>제2조(정의)</h4>
            <p>① "웹사이트"란 제주항공이 컴퓨터 등 정보통신설비와 정보통신망을 이용하여 정보 및 서비스를 이용자에게 제공하고 재화 또는 용역을 거래할 수 있도록 설정한 가상의 영업장을 말합니다.</p>
            <p>② "이용자"란 웹사이트에 접속하여 이 약관에 따라 제주항공이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</p>
            <p>③ "회원"이라 함은 웹사이트에 개인정보를 제공하여 회원등록을 한 자로서, 제주항공이 웹사이트를 통하여 지속적으로 제공하는 정보 및 서비스를 계속적으로 이용할 수 있는 자를 말합니다.</p>
            
            <h4>제3조(약관의 명시와 개정)</h4>
            <p>① 제주항공은 이 약관의 내용과 상호, 연락처 등을 이용자가 알 수 있도록 웹사이트의 초기 서비스화면에 게시합니다.</p>
            <p>② 제주항공은 관련법령을 위반하지 않는 범위에서 이 약관을 개정할 수 있습니다.</p>
            <p>③ 약관을 개정할 경우에는 개정사유 및 적용일자를 명시하여 현행약관과 함께 웹사이트의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.</p>
        `,
        privacy: `
            <h4>1. 개인정보의 수집 및 이용 목적</h4>
            <p>제주항공은 다음의 목적을 위하여 개인정보를 처리합니다.</p>
            <ul>
                <li>회원 가입 및 관리</li>
                <li>항공권 예약 및 발권 서비스 제공</li>
                <li>고객 상담 및 불만 처리</li>
                <li>서비스 개선 및 신규 서비스 개발</li>
            </ul>
            
            <h4>2. 수집하는 개인정보의 항목</h4>
            <p>필수항목: 성명, 생년월일, 성별, 연락처, 이메일 주소, 아이디, 비밀번호</p>
            <p>선택항목: 주소, 직업, 관심사항</p>
            
            <h4>3. 개인정보의 보유 및 이용기간</h4>
            <p>회원 탈퇴 시까지 보유 및 이용하며, 탈퇴 후에는 지체없이 파기합니다.</p>
            
            <h4>4. 개인정보의 제3자 제공</h4>
            <p>제주항공은 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.</p>
            <ul>
                <li>이용자들이 사전에 동의한 경우</li>
                <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
            </ul>
        `,
        marketing: `
            <h4>1. 마케팅 정보 수신 동의</h4>
            <p>제주항공은 다음과 같은 마케팅 정보를 제공합니다.</p>
            <ul>
                <li>항공권 할인 정보 및 특가 상품 안내</li>
                <li>신규 서비스 및 이벤트 정보</li>
                <li>회원 등급별 혜택 정보</li>
                <li>여행 관련 추천 정보</li>
            </ul>
            
            <h4>2. 제공 방법</h4>
            <p>이메일, SMS, 푸시 알림, 전화 등을 통해 제공됩니다.</p>
            
            <h4>3. 동의 철회</h4>
            <p>마케팅 정보 수신에 동의하신 후에도 언제든지 동의를 철회할 수 있습니다. 동의 철회 시에는 마케팅 정보 제공이 중단됩니다.</p>
            
            <h4>4. 동의하지 않을 권리</h4>
            <p>마케팅 정보 수신에 동의하지 않으셔도 서비스 이용에는 제한이 없습니다.</p>
        `
    };

    // 전체 동의 내용 (별도로 정의)
    const allTermsContent = `
        <h3>전체 동의</h3>
        <p>아래의 모든 약관에 동의합니다.</p>
        
        <h4>1. 서비스 약관</h4>
        ${termsContent.service}
        
        <h4>2. 개인정보 수집, 이용 동의</h4>
        ${termsContent.privacy}
        
        <h4>3. 마케팅 정보 수신 동의</h4>
        ${termsContent.marketing}
    `;

    return(
        <>
            <Header />
            <div className="agreement-container">
      
                <div className="agreement-content">
                    {/* 전체 동의 섹션 */}
                    <div className="agreement-section">
                        <div className="agreement-header">
                            <div className="checkbox-container">
                                <input
                                 onClick={() => handleCheckboxClick('all')}
                                 type="checkbox" 
                                 id="agreeAll" 
                                 className="checkbox"
                                 checked={agreeAll}
                                 readOnly />
                                <label htmlFor="agreeAll" className="checkbox-label">
                                    <span className="checkbox__ico"></span>
                                </label>
                            </div>
                            <span className="agreement-title">전체 동의</span>
                        </div>
                        <div className="divider"></div>
                        <p className="agreement-description">
                            전체동의에는 필수 및 선택동의가 포함되며, 개별적으로 동의를 선택할 수 있습니다.<br />
                            선택항목 동의여부 관계없이 정상적 서비스 이용가능합니다.
                        </p>
                    </div>

                    {/* 개별 약관 동의 항목들 */}
                    <div className="agreement-items">
                        <div className="agreement-item">
                            <div className="checkbox-container">
                                <input
                                onClick={() => handleCheckboxClick('service')} 
                                type="checkbox" 
                                id="serviceTerms" 
                                className="checkbox"
                                checked={agreeService}
                                readOnly />
                                <label htmlFor="serviceTerms" className="checkbox-label">
                                    <span className="checkbox__ico"></span>
                                </label>
                            </div>
                            <span className="agreement-text">(필수) 서비스 약관</span>
                            <span className="arrow"></span>
                        </div>

                        <div className="agreement-item">
                            <div className="checkbox-container">
                                <input
                                onClick={() => handleCheckboxClick('privacy')} 
                                type="checkbox" 
                                id="privacyTerms" 
                                className="checkbox"
                                checked={agreePrivacy}
                                readOnly />
                                <label htmlFor="privacyTerms" className="checkbox-label">
                                    <span className="checkbox__ico"></span>
                                </label>
                            </div>
                            <span className="agreement-text">(필수) 개인정보 수집, 이용 동의</span>
                            <span className="arrow"></span>
                        </div>

                        <div className="agreement-item">
                            <div className="checkbox-container">
                                <input
                                onClick={() => handleCheckboxClick('marketing')} 
                                type="checkbox" 
                                id="marketingTerms" 
                                className="checkbox"
                                checked={agreeMarketing}
                                readOnly />
                                <label htmlFor="marketingTerms" className="checkbox-label">
                                    <span className="checkbox__ico"></span>
                                </label>
                            </div>
                            <span className="agreement-text">(선택) 마케팅 정보 수신 동의</span>
                            <span className="arrow"></span>
                        </div>
                    </div>

                    {/* 마케팅 동의 안내 */}
                    <div className="marketing-notice">
                        <span className="asterisk">*</span>
                        <span className="notice-text">
                            마케팅 정보 수신에 동의하시면 특가 및 이벤트 정보를 받아보실 수 있으며, 
                            동의 시 연락처는 마케팅에 활용되고 철회 시 회원가입 목적으로만 사용됩니다.
                        </span>
                    </div>

                    {/* 다음 버튼 */}
                    <div className="next-button-container">
                        <button 
                            className={`next-button ${isRequiredTermsChecked ? 'active' : 'disabled'}`}
                            disabled={!isRequiredTermsChecked}
                            onClick={() => {
                                if (isRequiredTermsChecked) {
                                    // 다음 페이지로 이동 (회원가입 페이지)
                                    nav('/membership')
                                    // 여기에 라우팅 로직 추가
                                }
                            }}
                        >
                            다음
                        </button>
                    </div>
                </div>
            </div>

            {/* react-modal 컴포넌트 */}
                    <Modal
                        isOpen={isModalOpen}         //모달이 열려있는지 여부 (boolean)
                        onRequestClose={closeModal}  //ESC키나 오버레이 클릭 시 실행될 함수
                        className="terms-modal"      
                        overlayClassName="terms-modal-overlay"  //배경 오버레이의 CSS 클래스
                        ariaHideApp={false}                     //접근성 관련 설정
                    >
                        <div className="modal-header">
                            <h2>{modalTitle}</h2>
                            <button className="modal-close-btn" onClick={closeModal}>
                                ×
                            </button>
                        </div>
                        <div 
                            className="modal-content"
                            dangerouslySetInnerHTML={{ __html: modalContent }}
                        />
                        <div className="modal-footer">
                            {modalType === 'all' ? (
                                <button className="modal-agree-button" onClick={handleAgreeAll}>
                                    전체동의
                                </button>
                            ) : (
                                <button className="modal-agree-button" onClick={handleAgreeIndividual}>
                                    동의
                                </button>
                            )}
                        </div>
                    </Modal>
            <Footer />
        </>
    )
}

export default UserAgreement;