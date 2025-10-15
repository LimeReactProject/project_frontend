import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import apiClient from "../../apis/NoticeApi";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import styles from "./NoticeEdit.module.css";

function NoticeEdit() {

    const {id} = useParams();
    const nav = useNavigate();
    const [form, setForm] = useState({ title: "", content: "" });
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ 
            ...f, [name]: value
         }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await apiClient.put(`/edit/${id}`, form);
            nav(-1);
          } catch (e) {
            console.error(e);
            alert('수정 중 오류가 발생했습니다.');
          }
    };

    return(
        <>
        <Header/>
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>공지사항 수정</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="title">제목</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={form.title}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="제목을 입력하세요"
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="content">내용</label>
                    <textarea
                        id="content"
                        name="content"
                        value={form.content}
                        onChange={handleChange}
                        className={styles.textarea}
                        placeholder="내용을 입력하세요"
                        rows={12}
                        required
                    />
                </div>

                <div className={styles.actions}>
                    <Link className={styles.buttonGhost} to={`/noticeDetail/${id}`}>취소</Link>
                    <button type="submit" className={styles.buttonPrimary}>저장</button>
                </div>
            </form>
        </div>
        <Footer/>
        </>
    )
}

export default NoticeEdit;