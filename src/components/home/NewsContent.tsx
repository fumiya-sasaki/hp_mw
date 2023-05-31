import { newsData } from "@/helper/displayData";
import styles from '@/styles/home.module.css'
import Link from "next/link";
import React from "react";

export const NewsContent = React.memo(() => {
    return (<>
        <div className={styles.news_title_box}>
            <p className={styles.news_title}>NEWS</p>
        </div>
        <div className={styles.news_content_container}>
            {newsData.slice(0, 3).map(news => (
                <Link href="news" key={news.title} className={styles.news_content_box}>
                    <div className={styles.card}>
                        <p className={styles.image}><img src={news.img} alt="" /></p>
                        <p className={styles.card_title}>{news.title}</p>
                        <p className={styles.card_text}>{news.text}</p>
                    </div>
                </Link>
            ))}
        </div>
        <div className={styles.more_button_box}>
            <Link className={styles.more_button} href="news">MORE</Link>
        </div>
    </>);
});