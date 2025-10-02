import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./viewOnOffReservationList.module.css";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import ErrorModal from "../home/ErrorModal";

function ViewOnOffReservationList() {

  // 페이지 이동용 navigate
  const navigate = useNavigate();
  // 유의사항 열림/닫힘 상태관리
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  // 예약조회 상태관리
  const [form, setForm] = useState({
    reservationNo: "",  // 예약번호
    flightDate: "",     // 탑승일자
    lastName: "",       // 성
    firstName: ""       // 이름
  });

  // input 값이 바뀔 때마다 state 업데이트
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 입력 값 받아야 조회 버튼 클릭 가능
  const isFormValid =
    form.reservationNo.trim() !== "" &&
    form.lastName.trim() !== "" &&
    form.firstName.trim() !== "";

  const handleSearch = () => {
    if (isFormValid) {
      onSearch(form); // API 요청 or 부모 컴포넌트로 전달
    }
  };

  // 조회 실패 시 모달
  const [errorModal, setErrorModal] = useState({
    open: false,
    message: "",
    code: ""
  });

  // 조회 버튼을 눌렀을 때 함수 실행
  const handleSubmit = (e) => {
    e.preventDefault(); // 새로고침 막기

    console.log("보내는 데이터:", form);

    // 서버에 POST 요청
    fetch("http://localhost:8080/reservation/detail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form), // 예약번호, 이름, 비행일자 등 4개 값
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("조회 실패 (status: " + res.status + ")");
        }
        return res.json();
      })
      .then(detail => {
        if (detail) {
          console.log("예약 상세 데이터:", detail);
          navigate("/ReservationDetails", { state: { reservation: detail } });
        } else {
          alert("조회 결과가 없습니다.");
        }
      })
      .catch(err => {
        setErrorModal({ open: true, message: err.message, code: err.code });
      });
    };

  return (
    <React.Fragment>
      <Header />
      <main id="main" className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2>비회원 예약조회</h2>
          </div>

          {/* 조회 폼 */}
          <form onSubmit={handleSubmit} className={styles.formBox}>
            <div className={styles.formRow}>
              <label>예약번호</label>
              <input
                type="text"
                name="reservationNo"
                value={form.reservationNo}
                onChange={handleChange}
                placeholder="예약번호 입력"
                maxLength={5}
              />
              <label>탑승일자</label>
              <input
                type="date"
                name="flightDate"
                value={form.flightDate}
                onChange={handleChange}
              />
            </div>

            <p className={styles.infoText}>
              여행사, 공항, 고객센터, 비회원 예약 및 회원 예약도 조회할 수 있어요. <br />
              여행사에서 구매하신 고객님은 항공사 예약번호를 입력해 주세요.
            </p>
            <br />

            <h4 className={styles.subTitle}>탑승객 정보 입력</h4>
            <p className={styles.infoText}>
              예약 시 입력한 탑승객명을 입력해 주세요. <br />
              국제선의 경우 반드시 영문 탑승객명을 입력하셔야 조회가 가능합니다.
            </p>
            <br />

            <div className={styles.formRow}>
              <label>성</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="성 입력"
              />
              <label>이름</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="이름 입력"
              />
              <button type="button" className={styles.addBtn}>추가</button>
            </div>

            <div className={styles.formRow}>
              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={!isFormValid}
              >
                조회
              </button>

              <ErrorModal
                open={errorModal.open}
                message={errorModal.message}
                code={errorModal.code}
                onClose={() => setErrorModal({ ...errorModal, open: false })}
              />
            </div>
          </form>


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
                <p>· 홈페이지 로그인 없이 간편하게 예약조회가 가능합니다.</p>
                <p>· 항공권 예약 변경 및 취소 문의는 해당 구매처로 문의바랍니다.</p>
                <p>· 예약조회 시 부가서비스 구매 및 취소가 가능합니다.</p>
                <p>· 부가서비스 구매 취소 내역 확인은, 예약 조회 후 확인 가능하시며, 탑승객 연락처가 존재할 경우에 한하여 구매/취소 확인서가 제공됩니다.</p>
                <p>· 구매처별 부가서비스 구매가 제한될 수 있습니다.</p>
                <p>· 부가서비스 추가 구매후 취소를 원하시는 경우, 부가서비스 선 취소 후 해당 여행사 또는 구매처를 통해 항공권 취소가 가능합니다.</p>
                <p>· 항공권 구매처를 통해 여정확인서 발급이 가능합니다.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}


export default ViewOnOffReservationList;
