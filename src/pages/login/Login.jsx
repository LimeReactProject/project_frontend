import React from "react";
import styles from "./Login.module.css";
import Header from "../../common/Header";
import Footer from "../../common/Footer";

// 상태관리
const [id, setId] = useState("");
const [password, setPassword] = useState("");
const [saveId, setSaveId] = useState(false);





function Login() {
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

          {/* 아이디/비밀번호 입력 */}
          <div className={styles.formBox}>
            <input 
            type="text" 
            placeholder="아이디" 
            className={styles.input} 
            value={id}
            onChange={(e) => setId(e.target.value)}
            />
            <div className={styles.passwordRow}>
            <input
              type="password"
              placeholder="비밀번호"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className={styles.eyeIcon}>👁</span>
            </div>
            <label className={styles.checkRow}>
              <input type="checkbox" /> 아이디 저장
            </label>
            <br />
            <button className={styles.loginBtn}>로그인</button>
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
