import React, { useState } from "react";
import styles from "./domesticBenefit.module.css";
import Header from "../../common/Header";
import Footer from "../../common/Footer";

function DomesticBenefit() {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  return (
    <React.Fragment>
      <Header />
      <main id="main" className={styles.main}>
        <div className={styles.container}>
          {/* 상단 제목 */}
          <div className={styles.header}>
            <h2>국내선 운임 안내</h2>
            <p>노선별 운임 정보 및 할인 정보를 제공합니다.</p>
          </div>

          {/* 탭 메뉴 */}
          <div className={styles.tabs}>
            <button className={`${styles.tab} ${styles.active}`}>국내선 운임 혜택</button>
            <button className={styles.tab}>운임 요율 안내</button>
            <button className={styles.tab}>노선별 운임 안내</button>
            <button className={styles.tab}>개인 및 단체 할인 안내</button>
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
                한 손에 든 짐 하나로 떠나는 가벼운 여행,
                실속 있게 여행을 즐기는 고객을 위한 운임입니다.
              </p>
              <ul>
                <li>기내 수하물 10KG</li>
              </ul>
            </div>

            {/* 스탠다드 */}
            <div className={styles.card}>
              <h4 className={styles.standard}>스탠다드</h4>
              <p>
                알뜰한 살림꾼 고객에게 추천 드립니다. 꼭 필요한 수하물만 챙겨 보세요.
              </p>
              <ul>
                <li>기내 수하물 10KG</li>
                <li>위탁 수하물 15KG</li>
              </ul>
            </div>

            {/* 플렉스 */}
            <div className={styles.card}>
              <h4 className={styles.flex}>플렉스</h4>
              <p>
                여행을 즐기는 고객이라면 부담 없이 꼭 필요한 수하물만 챙겨 가세요.
              </p>
              <ul>
                <li>기내 수하물 10KG</li>
                <li>위탁 수하물 15KG</li>
                <li>신분 할인 적용 가능</li>
              </ul>
            </div>

            {/* 비즈라이트 */}
            <div className={styles.card}>
              <h4 className={styles.biz}>비즈라이트</h4>
              <p>
                합리적인 가격으로 고품격 여행을 선호하는 고객에게 추천드리는 운임입니다.
              </p>
              <ul>
                <li>기내 수하물 10KG</li>
                <li>위탁 수하물 30KG</li>
                <li>넓은 프리미엄 컴포트 좌석 제공</li>
                <li>공항 라운지 할인</li>
                <li>탑승일 2일 전까지 무료 예약 변경</li>
                <li>우선 수속 처리</li>
              </ul>
            </div>
          </div> {/* cards 닫힘 */}

          {/* 서비스 옵션 사항 (아코디언) */}
          <div
            className={styles.optionBox}
            onClick={() => setIsOptionOpen((prev) => !prev)}
          >
            <div className={styles.optionHeader}>
              <span>서비스 옵션 사항</span>
              <span className={styles.arrow}>
                {isOptionOpen ? "▲" : "▼"}
              </span>
            </div>

            {isOptionOpen && (
              <div className={styles.optionContent}>
                <p>· 우선 탑승은 노약자 및 유·소아 승객과 동반 승객이 먼저 기내에 탑승할 수 있는 서비스입니다.</p>
                <p>· 탑승 수속 마감(체크인 마감) 이후 예약을 변경하거나 환불을 하는 경우 수수료가 부과됩니다.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default DomesticBenefit;
