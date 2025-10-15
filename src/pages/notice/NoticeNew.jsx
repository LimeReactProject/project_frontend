import { useState } from "react";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import apiClient from "../../apis/NoticeApi";
import { useNavigate, Link } from "react-router-dom";
import styles from "./NoticeEdit.module.css";

function NoticeNew() {

    const nav = useNavigate();
    const [form, setForm] = useState({
        title:"",
        content:"",
    })

    const onChange =(e) => {

        const {name , value} = e.target
        setForm((f)=>({
            ...f,
            [name] : value
        }));
        

    }

    const onsubmit = async(e) => {
        e.preventDefault();
        const ok = window.confirm('등록하시겠습니까?');
        if (!ok) return;

        await apiClient.post('/save',form)
        alert('등록이 완료되었습니다.');
        nav(-1)
    }


    return(
        <>
        <Header/>

        <div className={styles.container}>
            <h1 className={styles.pageTitle}>공지사항 작성</h1>

            <form className={styles.form} onSubmit={onsubmit}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="title">제목</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={form.title}
                        onChange={onChange}
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
                        onChange={onChange}
                        className={styles.textarea}
                        placeholder="내용을 입력하세요"
                        rows={12}
                        required
                    />
                </div>

                <div className={styles.actions}>
                    <Link className={styles.buttonGhost} to="/noticeList">취소</Link>
                    <button type="submit" className={styles.buttonPrimary}>등록</button>
                </div>
            </form>
        </div>

        <Footer/>
        </>
    )
}

export default NoticeNew;