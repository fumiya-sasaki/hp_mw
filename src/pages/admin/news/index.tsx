import { AdminState, NewsBaseData } from '@/common/types';
import { Redirect } from '@/components/admin/Redirect';
import { RootState, useAppDispatch } from '@/hooks/common';
import { getNewsDataListForAdmin } from '@/redux/admin';
import styles from '@/styles/admin.module.css'
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
export const AdminHome = () => {
    const dispatch = useAppDispatch();
    const admin: AdminState = useSelector((state: RootState) => state.admin);
    const [displayNewsData, setDisplayNewsData] = useState<NewsBaseData[]>([]);

    useEffect(() => {
        if (admin.isLogin && Object.values(admin.newsData).length === 0) {
            dispatch(getNewsDataListForAdmin());
        };
    }, [admin.isLogin]);

    useEffect(() => {
        if (admin.newsData) {
            setDisplayNewsData(Object.values(admin.newsData)
                .sort((a, b) => b.createdAt - a.createdAt));
        }
    }, [admin.newsData]);

    const onPressGetMoreNewsData = useCallback(() =>
        dispatch(getNewsDataListForAdmin()), []);

    return (
        <div className={styles.news_container}>
            <Redirect />
            {admin.isLogin && <>
                <Link href={`/admin/news/new`} className={styles.news_content_container}>
                    <p className={styles.content_title}>新記事</p>
                </Link>
                {displayNewsData.map(news => (
                    <Link key={news.uid} href={`/admin/news/${news.uid}`} className={styles.news_content_container}>
                        <h4 className={styles.content_title}>{news.title}</h4>
                        <div className={styles.content_box}>
                            <img alt='' className={styles.content_img} src={news.imageUrls[0]} />
                            <p className={styles.content_text}>{news.content}</p>
                        </div>
                    </Link>
                ))}
                <div className={styles.more_button_box}>
                    <button className={styles.more_button}
                        onClick={onPressGetMoreNewsData}>MORE</button>
                </div>
                <div>
                    <Link href='/admin'>HOMEに戻る</Link>
                </div></>}
        </div>)
};

export default AdminHome;