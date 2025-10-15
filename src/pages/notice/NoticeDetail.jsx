import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import apiClient from "../../apis/NoticeApi";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import styles from "./NoticeDetail.module.css";
import axios from "axios";


function NoticeDetail() {

    const { id }= useParams();
    const nav = useNavigate();
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [userRole, setUserRole] = useState(null);
    

    useEffect(()=>{
        // 사용자 역할 확인
        const user = sessionStorage.getItem("loginUser");
        if (user) {
            try {
                const userData = JSON.parse(user);
                setUserRole(userData.role || userData.userRole);
            } catch (e) {
                console.error('사용자 정보 파싱 오류:', e);
            }
        }

        const axiosData = async() => {
            try{
                setLoading(true);
                const response = await apiClient.get(`/detail/${id}`);
                setForm(response.data);
                console.log(response.data);
            } catch (error){
                console.error('에러:', error)
            } finally {
                setLoading(false);
            } 
       }
        axiosData();
    },[id])

    


    const toggleImportantAndGoBack = async () => {
        if (!form?.noticeId) return;
        const willSet = !form.isImportant;
        const msg = willSet ? '이 공지를 중요로 설정하시겠습니까?' : '이 공지를 중요에서 해제하시겠습니까?';
        if (!window.confirm(msg)) return;
        try {
            setUpdating(true);
            // 하나의 토글 엔드포인트 사용
            await apiClient.patch(`/${form.noticeId}/important`);
            alert(willSet ? '중요로 설정되었습니다.' : '중요가 해제되었습니다.');
            setForm((prev) => ({ ...prev, isImportant: willSet }));
            if (window.history.length > 1) nav(-1); else nav('/noticeList');
        } catch (e) {
            console.error(e);
            alert('중요 상태 변경 중 오류가 발생했습니다.');
        } finally {
            setUpdating(false);
        }
    }

    return(
        <>
        <Header/>
        <div className={styles.container}>
            <div className={styles.headerRow}>
                <h1 className={styles.title}>{form?.title}</h1>
                <span className={styles.date}>{form?.createdAt}</span>
            </div>
            <div className={styles.divider} />

            <div className={styles.content}>
                {form?.content}
            </div>

            <div className={styles.actions}>
                <Link className={styles.backButton} to="/noticeList">목록</Link>
                {userRole === 'ADMIN' && form?.noticeId && (
                    <Link className={styles.editButton} to={`/noticeEdit/${form.noticeId}`}>수정</Link>
                )}
                {userRole === 'ADMIN' && form?.noticeId && (
                    <button
                        className={styles.importantButton}
                        disabled={updating}
                        onClick={toggleImportantAndGoBack}
                    >
                        {form.isImportant ? '중요 해제' : '중요 표시'}
                    </button>
                )}
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default NoticeDetail;