import React, { useEffect, useState } from 'react';
import styles from './NoticeList.module.css';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../../apis/NoticeApi';

function NoticeList() {
    
    const nav = useNavigate();
    
    const [loading,setLoading] = useState(false);
    const [form,setForm] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [userRole, setUserRole] = useState(null); 

    const totalPages = form.meta?.totalPages || 1;

    useEffect(()=>{

        const user = sessionStorage.getItem('loginUser')
        
        if (user) {
            try {
                const userData = JSON.parse(user);
                setUserRole(userData.role || userData.userRole);
            } catch (e) {
                console.error('사용자 정보 파싱 오류:', e);
            }
        }

        const fetchData = async() => {

            try{
                setLoading(true);iClient.get('/list');
                setForm(response.data);
                
                const response = await apconsole.log(response.data)
            } catch(error){
                console.error('에러:',error);
            } finally {
                setLoading(false);
            };
        };
            fetchData();
    },[]);

  

    // 페이지 번호 배열 생성
    const getPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <>
        <Header/>
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>공지사항</h1>
                <p className={styles.subtitle}>새소식과 운임 공지를 확인해 보세요</p>
            </div>

            <div className={styles.headerActions}>
                {userRole === 'ADMIN' && (
                <Link className={styles.writeButton} to="/noticeNew">공지 작성</Link>
                )}
            </div>

      
            <div className={styles.list}>
            {form.items?.map((item)=>(
                    <div key={item.noticeId} className={styles.item}>
                        <div className={styles.content}>
                           {item.isImportant && <span className={styles.badgeImportant}>중요</span>}
                           <Link className={styles.link} to={`/noticeDetail/${item.noticeId}`}>
                               <h3 className={styles.noticeTitle}>{item.title}</h3>
                           </Link>
                            <p className={styles.date}>{item.createdAt}</p>
                        </div>
                        <button className={styles.arrow}>›</button>
                    </div>
                 ))}
            </div>

            <div className={styles.pagination}>
                <button className={styles.pageBtn} onClick={() => setCurrentPage(1)}>
                    ≪
                </button>
                <button 
                    className={styles.pageBtn}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                >
                    ‹
                </button>
                
                {getPageNumbers().map((page) => (
                    <button
                        key={page}
                        className={`${styles.pageNum} ${currentPage === page ? styles.pageNumActive : ''}`}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </button>
                ))}
                
                <button 
                    className={styles.pageBtn}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                >
                    ›
                </button>
                <button className={styles.pageBtn} onClick={() => setCurrentPage(totalPages)}>
                    ≫
                </button>
            </div>
        </div>
        <Footer/>
        </>

    );
}

export default NoticeList;