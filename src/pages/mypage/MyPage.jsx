import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyPage.module.css";
import Header from "../../common/Header";
import Footer from "../../common/Footer";

function MyPage() {
  const nav = useNavigate();
  const [user, setUser] = useState(null);

  // ✅ 로그인 여부 확인
  useEffect(() => {
    const storedUser = sessionStorage.getItem("loginUser");
    if (!storedUser) {
      alert("로그인이 필요한 서비스입니다.");
      nav("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [nav]);

  // ✅ 로그아웃
  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      sessionStorage.removeItem("loginUser");
      alert("로그아웃 되었습니다.");
      nav("/");
    }
  };

  if (!user) return null; // user가 없으면 아무것도 렌더링하지 않음

  return (
    <React.Fragment>
      <Header />

      <main className={styles.main}>
        {/* 상단 타이틀 */}
        <section className={styles.titleSection}>
          <h2>마이페이지</h2>
          <p>{user.name} 고객님, 어디로 여행가세요?</p>
          <button
            className={styles.reserveBtn}
            onClick={() => nav("/reserv")}
          >
            항공권 예약
          </button>
        </section>

        {/* 사용자 정보 */}
        <section className={styles.infoSection}>
          <div className={styles.infoBox}>
            <div className={styles.profileIcon}>
              {user.name ? user.name[0] : "U"}
            </div>
            <div className={styles.memberInfo}>
              <p>회원번호 {user.memberNo || "미등록"}</p>
              <a href="#">회원정보 수정 &gt;</a>
            </div>
          </div>

          <div className={styles.pointsBox}>
            <p className={styles.pointLabel}>사용가능 포인트</p>
            <p className={styles.pointValue}>
              {user.points ? user.points.toLocaleString() : "0"}P
            </p>
            <button className={styles.benefitBtn}>나의 혜택 확인</button>
          </div>
        </section>

        {/* 서브 메뉴 */}
        <section className={styles.subMenu}>
          <button>나의 1:1 문의</button>
          <button>탑승객/반려동물 관리</button>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            로그아웃
          </button>
        </section>

        {/* 예약 현황 */}
        <section className={styles.reservationSection}>
          <h3>예약 현황</h3>
          <div className={styles.reservationBox}>
            <p>다른 곳에서 예약하셨나요?</p>
            <a href="#" className={styles.link}>
              여행사/고객센터/공항구매 조회 &gt;
            </a>
          </div>
          <button
            className={styles.pastBtn}
            onClick={() => nav("/ViewReservationList")}
          >
            지난 탑승 내역 보기
          </button>
        </section>
      </main>

      <Footer />
    </React.Fragment>
  );
}

export default MyPage;
