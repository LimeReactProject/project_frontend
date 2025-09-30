import React from "react";
import styles from "./ReservationDetails.module.css";
import Header from "../../common/Header";
import Footer from "../../common/Footer";

function ReservationDetails() {
  return (
    <React.Fragment>
      <Header />
      <main id="main" className={styles.main}>
        <div className={styles.container}>
          {/* 상단 제목 */}
          <div className={styles.header}>
            <h2>예약상세</h2>
          </div>

          {/* 예약 요약 */}
          <div className={styles.summary}>
            <div>
              <span className={styles.label}>예약번호</span>
              <span className={styles.value}>ABC123</span>
            </div>
            <div>
              <span className={styles.label}>예약일</span>
              <span className={styles.value}>2025.09.29</span>
            </div>
            <div>
              <span className={styles.label}>구분</span>
              <span className={styles.value}>왕복</span>
            </div>
          </div>

          {/* 여정 정보 */}
          <div className={styles.journeyBox}>
            <h3>여정 정보</h3>

            {/* 가는편 */}
            <div className={styles.journey}>
              <div className={styles.flightInfo}>
                <span className={styles.date}>2025.10.10 (금) 09:35</span>
                <span className={styles.city}>서울(인천)</span>
              </div>
              <div className={styles.arrow}>→</div>
              <div className={styles.flightInfo}>
                <span className={styles.date}>2025.10.10 (금) 11:30</span>
                <span className={styles.city}>후쿠오카</span>
              </div>
            </div>

            {/* 오는편 */}
            <div className={styles.journey}>
              <div className={styles.flightInfo}>
                <span className={styles.date}>2025.10.15 (수) 17:35</span>
                <span className={styles.city}>후쿠오카</span>
              </div>
              <div className={styles.arrow}>→</div>
              <div className={styles.flightInfo}>
                <span className={styles.date}>2025.10.15 (수) 19:05</span>
                <span className={styles.city}>서울(인천)</span>
              </div>
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className={styles.buttonBox}>
            <button className={styles.serviceBtn}>부가서비스 구매</button>
            <button className={styles.cancelBtn}>부가서비스 취소</button>
          </div>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default ReservationDetails;
