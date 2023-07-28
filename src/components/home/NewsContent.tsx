import { NewsData } from '@/common/types';
import { RootState, useAppDispatch } from '@/hooks/common';
import { getNewsDataList } from '@/redux/news';
import styles from '@/styles/home.module.css'
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const NewsContent = React.memo(() => {
    const newsData: NewsData = useSelector((state: RootState) => state.news.data);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (Object.values(newsData).length === 0) {
            dispatch(getNewsDataList());
        }
    }, []);

    return (<>
        <div className={styles.news_title_box}>
            <p className={styles.news_title}>NEWS</p>
        </div>
        <div className={styles.news_content_container}>
            {Object.values(newsData).slice(0, 3).map(news => (
                <Link href={`news/detail/${news.uid}`} key={news.title} className={styles.news_content_box}>
                    <div className={styles.card}>
                        <p className={styles.image}><img src={news.imageUrls[0]} alt='' /></p>
                        <p className={styles.card_title}>{news.title}</p>
                        <p className={styles.card_text}>{news.content}</p>
                    </div>
                </Link>
            ))}
        </div>
        <div className={styles.more_button_box}>
            <Link className={styles.more_button} href='news'>MORE</Link>
        </div>
    </>);
});