import styles from "../../css/home/ErrorModal.module.css";

function ErrorModal({ open, code, onClose }) {
  if (!open) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
          <p>조회에 실패하였습니다.</p>
          <p>잠시 후 다시 시도하여 주시기 바랍니다.</p>
        <p className={styles.errorCode}>{code}</p>
        <button className={styles.confirmBtn} onClick={onClose}>확인</button>
      </div>
    </div>
  );
}

export default ErrorModal;
