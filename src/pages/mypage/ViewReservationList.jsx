import React, { useState } from "react";
import styles from "./viewReservationList.module.css";
import Header from "../../common/Header";
import Footer from "../../common/Footer";

function ViewReservationList() {
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  return (
    <React.Fragment>
      <Header />
      <main id="main" className={styles.main}>
        <div className={styles.container}>
          {/* 상단 제목 */}
          <div className={styles.header}>
            <h2>나의 예약현황</h2>
            <p className={styles.path}>여행사/고객센터/공항구매 조회 &gt;</p>
          </div>

          {/* 예약 내역 없음 */}
          <div className={styles.emptyBox}>
            <div className={styles.icon}>❗</div>
            <p className={styles.emptyMsg}>예매하신 일정이 없습니다.</p>
            <br />
            <a href="/reserv" className={styles.submitBtn}>항공권 조회</a>
          </div>

          {/* 유의사항 (아코디언) */}
          <div
            className={styles.noticeBox}
            onClick={() => setIsNoticeOpen((prev) => !prev)}
          >
            <div className={styles.noticeHeader}>
              <span>유의사항</span>
              <span className={styles.arrow}>{isNoticeOpen ? "▲" : "▼"}</span>
            </div>

            {isNoticeOpen && (
              <div className={styles.noticeContent}>
                <p>· 예약 내역을 누르면 상세정보 확인 후 예약을 변경하거나 취소할 수 있습니다.</p>
                <p>· 구매한 항공권에 대한 예약 변경 및 취소 시 운임 규정에 따른 수수료가 부과됩니다.</p>
                <p>· 예약 내역은 최근 400일간 인터넷으로 구매한 예약만 조회됩니다.</p>
                <p>· 모바일 탑승권 발급 서비스는 국내선의 경우 출발 24시간 전 ~ 30분 전까지, 국제선은 출발 24시간 전 ~ 1시간 반 전까지 가능합니다.</p>
                <p>· 신분할인 및 유아동반 탑승객, 해외출발 항공편의 모바일 탑승권 발급은 제한적으로 제공됩니다.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default ViewReservationList;
