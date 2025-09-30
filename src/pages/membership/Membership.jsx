import Header from '../../common/Header';
import Footer from '../../common/Footer';
import '../../css/membership/Membership.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../apis/MembershipApi';

function Membership() {

    const [form,setForm] = useState({
        name: '',
        email: '',
        id: '',
        password: '',
        
    });
    
    const nav = useNavigate();

    const handleForm = (e) => {
        const {name, value} = e.target;
        
        setForm((f) => ({
            ...f,
            [name]: value
        }));
    };

    const onsubmit = async(e) => {
        e.preventDefault();
        
        // 필수 필드 검증
        if (!form.name || !form.email || !form.id || !form.password) {
            alert('모든 필드를 입력해주세요.');
            return;
        }
        
        try {
            console.log('전송할 데이터:', form);
            const response = await apiClient.post('', form);
            console.log('회원가입 성공:', response.data);
            alert('회원가입이 완료되었습니다!');
            nav('/login');
        } catch (error) {
            console.error('회원가입 실패:', error);
            console.error('에러 상세:', error.response?.data);
            alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
    }

    

    return (
        <>
            <Header />
            <div className="membership-container">
                <div className="membership-content">
                    {/* 회원가입 제목 */}
                    <div className="membership-header">
                        <h1>회원가입</h1>
                        <p className="membership-subtitle">제주항공에 오신 것을 환영합니다</p>
                    </div>

                    {/* 회원가입 폼 */}
                    <form
                        onSubmit={onsubmit} 
                        className="membership-form">
                        {/* 이름 입력 */}
                        <div className="input-group">
                            <label className="input-label">
                                <span className="label-text">이름</span>
                                <span className="required">*</span>
                            </label>
                            <div className="input-wrapper">
                                <input 
                                    name='name'
                                    value={form.name}
                                    onChange={handleForm}
                                    type="text" 
                                    className="form-name"
                                    placeholder="이름을 입력해주세요"
                                />
                            </div>
                        </div>

                        {/* 이메일 입력 */}
                        <div className="input-group">
                            <label className="input-label">
                                <span className="label-text">이메일</span>
                                <span className="required">*</span>
                            </label>
                            <div className="input-wrapper">
                                <input
                                    name='email'
                                    value={form.email} 
                                    onChange={handleForm}
                                    type="email" 
                                    className="form-email"
                                    placeholder="이메일을 입력해주세요"
                                />
                            </div>
                        </div>

                        {/* 아이디 입력 */}
                        <div className="input-group">
                            <label className="input-label">
                                <span className="label-text">아이디</span>
                                <span className="required">*</span>
                            </label>
                            <div className="input-wrapper">
                                <input
                                    name='id'
                                    value={form.id} 
                                    onChange={handleForm}
                                    type="text" 
                                    className="form-id"
                                    placeholder="아이디를 입력해주세요"
                                />
                            </div>
                        </div>

                        {/* 비밀번호 입력 */}
                        <div className="input-group">
                            <label className="input-label">
                                <span className="label-text">비밀번호</span>
                                <span className="required">*</span>
                            </label>
                            <div className="input-wrapper">
                                <input
                                    name='password'
                                    value={form.password} 
                                    onChange={handleForm}
                                    type="password" 
                                    className="form-password"
                                    placeholder="비밀번호를 입력해주세요"
                                />
                            </div>
                        </div>


                        {/* 회원가입 버튼 */}
                        <div className="button-group">
                            <button type='submit' className="signup-button">
                                회원가입
                            </button>
                        </div>

                        {/* 로그인 링크 */}
                        <div className="login-link">
                            <p>이미 계정이 있으신가요? <a href="/login" className="link">로그인</a></p>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Membership;