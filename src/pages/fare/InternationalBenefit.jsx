import React, { useState } from "react";
import styles from "./internationalBenefit.module.css";
import Header from "../../common/Header";
import Footer from "../../common/Footer";

function InternationalBenefit() {
  const [isOptionOpen, setIsOptionOpen] = useState(false);

  return (
    <React.Fragment>
      <Header />
      <main id="main" className={styles.main}>
        <div className={styles.container}>
          {/* 상단 제목 */}
          <div className={styles.header}>
            <h2>국제선 운임 안내</h2>
            <p>노선별 운임 정보 및 할인 정보를 제공합니다.</p>
          </div>

          {/* 탭 메뉴 */}
          <div className={styles.tabs}>
            <button className={`${styles.tab} ${styles.active}`}>국제선 운임 혜택</button>
            <button className={styles.tab}>운임 옵션</button>
            <button className={styles.tab}>노선별 운임</button>
            <button className={styles.tab}>수수료 및 위약금</button>
            <button className={styles.tab}>성수기 안내</button>
          </div>

          {/* 서비스 옵션 소개 */}
          <h3 className={styles.sectionTitle}>서비스 옵션 소개</h3>
          <div className={styles.cards}>
            {/* 베이직 */}
            <div className={styles.card}>
              <h4 className={styles.basic}>베이직</h4>
              <p>
                짐은 최소화하고 합리적인 가격으로 여행을 즐기고 싶은 고객을 위한 운임입니다.
              </p>
              <ul>
                <li>기내 수하물 10KG</li>
              </ul>
            </div>

            {/* 스탠다드 */}
            <div className={styles.card}>
              <h4 className={styles.standard}>스탠다드</h4>
              <p>꼭 필요한 만큼의 수하물을 이용하고 싶은 고객께 추천드립니다.</p>
              <ul>
                <li>기내 수하물 10KG</li>
                <li>위탁 수하물 15KG (미주 노선은 1개 × 23KG)</li>
              </ul>
            </div>

            {/* 비즈라이트 */}
            <div className={styles.card}>
              <h4 className={styles.biz}>비즈라이트</h4>
              <p>넓은 좌석과 다양한 부가 혜택을 합리적인 가격으로 누릴 수 있는 운임입니다.</p>
              <ul>
                <li>기내 수하물 10KG</li>
                <li>위탁 수하물 30KG (미주 노선은 2개 × 23KG)</li>
                <li>넓은 프리미엄 컴포트 좌석 제공</li>
                <li>기내식 제공</li>
                <li>공항 현장 우선 탑승</li>
                <li>전용 카운터 우선 체크인</li>
                <li>우선 수하물 처리</li>
              </ul>
            </div>
          </div>

          {/* 서비스 옵션 사항 (아코디언) */}
          <div
            className={styles.optionBox}
            onClick={() => setIsOptionOpen((prev) => !prev)}
          >
            <div className={styles.optionHeader}>
              <span>서비스 옵션 사항</span>
              <span className={styles.arrow}>{isOptionOpen ? "▲" : "▼"}</span>
            </div>

            {isOptionOpen && (
              <div className={styles.optionContent}>
                <p>· 국제선의 경우 무료 위탁 수하물 규정은 노선과 운임 종류에 따라 다를 수 있습니다.</p>
                <p>· 항공권 예약 변경 및 환불 시 수수료가 부과될 수 있습니다.</p>
                <p>· 우선 탑승은 노약자 및 유아 동반 승객을 포함한 고객이 먼저 탑승할 수 있는 서비스입니다.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default InternationalBenefit;
