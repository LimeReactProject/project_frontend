import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./ReservationDetails.module.css";
import Header from "../../common/Header";
import Footer from "../../common/Footer";

function ReservationDetails() {

  const location = useLocation();
  const reservation = location.state?.reservation;

  
  if (!reservation) {
    return <div>예약 데이터가 없습니다.</div>;
  }

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
              <span className={styles.value}>{reservation.reservNum}</span>
            </div>
            <div>
              <span className={styles.label}>예약일</span>
              {new Date(reservation.paymentTime).toLocaleDateString()}
            </div>
            <div>
              <span className={styles.label}>예약자</span>
              <span className={styles.value}>{reservation.memberName}</span>
            </div>
          </div>

          {/* 여정 정보 */}
          <div className={styles.journeyBox}>
            <h3>여정 정보</h3>

            {/* 가는편 */}
            <div className={styles.journey}>
              <div className={styles.flightInfo}>
                <span className={styles.date}>
                  {new Date(reservation.actualDepartureTime).toLocaleString()}
                </span>
                <span className={styles.city}>
                  {reservation.departureCode}
                </span>
              </div>
              <div className={styles.arrow}>→</div>
              <div className={styles.flightInfo}>
                <span className={styles.date}>
                  {new Date(reservation.actualArrivalTime).toLocaleString()}
                </span>
                <span className={styles.city}>
                  {reservation.arrivalCode}
                </span>
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
