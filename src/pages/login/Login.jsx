import React, { useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";
import Header from "../../common/Header";
import Footer from "../../common/Footer";


function Login() {

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 패스워드 토글
  const [idError, setIdError] = useState(false); // 아이디 유효성
  const [loginError, setLoginError] = useState(false); // 로그인 실패 시 표시

  // 입력 중일 때 (즉시 에러 해제)
  const handleIdChange = (e) => {
    const value = e.target.value;
    setId(value);

    // 입력 중일 때는 에러 즉시 제거
    if (idError) setIdError(false);
    if (loginError) setLoginError(false);
  };

  // 포커스 벗어났을 때 길이 검사
  const handleIdBlur = () => {
    if (id.length > 0 && id.length <= 3) {
      setIdError(true); // 에러 발생
    } else {
      setIdError(false); // 정상 입력
    }
  };

  // 비밀번호 입력
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (loginError) setLoginError(false);
  };
  
  // 비밀번호 보기 / 숨기기
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // 비밀번호 6자리 이상일 때 활성화
  const isActive = password.length >= 6 && id.length >= 4;

  // 로그인 요청
  const handleLogin = async (e) => {
    e.preventDefault(); // 새로고침 방지

    if (id.trim() === "" || password.trim() === "") {
      setLoginError(true);
      return;
    }

    try {
      // axios 요청
      const response = await axios.post("http://localhost:8080/login/loginCk", {
        userId: id,
        userPw: password,
      });

      const data = response.data;

      if (data.result === "success") {
        alert("로그인 성공!");
        console.log("로그인 유저:", data.userInfo);
        
        sessionStorage.setItem("loginUser", JSON.stringify(data.userInfo)); // 로그인 상태 잠깐 저장

        window.location.href = "/";

  navigate("/"); // 홈으로 이동

      } else {
        setLoginError(true); // 로그인 실패 시 span 표시
      }
    } catch (error) {
      console.error("로그인 요청 오류:", error);
      setLoginError(true);
    }
  };
  

  return (
    <React.Fragment>
      <Header />
      <main id="main" className={styles.main}>
        <div className={styles.container}>
          {/* 상단 안내 */}
          <br />
          <div className={styles.header}>
            <h2>로그인</h2>
            <br />
          </div>

          {/* 아이디 입력 */}
          <div className={styles.formBox}>
            <input 
            type="text" 
            placeholder="아이디" 
            className={styles.input} 
            value={id}
            onChange={handleIdChange}
            onBlur={handleIdBlur}
            />
            {idError && (
                <span className={styles.errorUnderline}>
                  아이디를 정확하게 입력해주세요.
                </span>
              )}
            {/* 비밀번호 입력 */}
            <div className={styles.passwordRow}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호"
              className={styles.input}
              value={password}
              onChange={handlePasswordChange}
            />
           <span
              className={styles.eyeIcon}
              onClick={togglePassword} // 클릭 시 토글
              >
                {showPassword ? "🙈" : "👁"} {/* 아이콘 전환 */}
            </span>
            </div>
            {/* 로그인 실패 문구 */}
            {loginError && (
              <span className={styles.errorUnderline}>
                등록되지 않은 아이디이거나 비밀번호가 일치하지 않습니다.
              </span>
            )}
            <label className={styles.checkRow}>
              <input type="checkbox" /> 아이디 저장
            </label>
            <br />
            <button 
            
            onClick={handleLogin}
            disabled={!isActive}
            className={`${styles.loginBtn} ${
              isActive ? styles.activeBtn : styles.disabledBtn
            }`}

            >로그인</button>
          </div>

          {/* 링크 */}
          <div className={styles.links}>
            <a href="#">아이디/비밀번호 찾기</a> | <a href="#">회원가입</a>
          </div>

          {/* 간편 로그인 */}
          <div className={styles.simpleLogin}>
            <p>또는</p>
           
          </div>

          {/* 비회원 로그인 */}
          <button className={styles.guestBtn}>비회원 로그인</button>
          <p className={styles.guestInfo}>
            ※ 비회원으로 로그인하시면 포인트 및 회원 운임 할인 혜택 등이 제공되지 않습니다.
          </p>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default Login;
