import { Navigator } from '../../components/common/Navigator';
import styles from '../../styles/news.module.css';
import Link from 'next/link';
import { getNewsDataList } from '../../redux/news';
import { RootState, useAppDispatch } from '../../hooks/common';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NewsBaseData, NewsState } from '@/common/types';

export const PageNum = () => {
    const dispatch = useAppDispatch();
    const news: NewsState = useSelector((state: RootState) => state.news);
    const [displayNewsData, setDisplayNewsData] = useState<NewsBaseData[]>([]);

    useEffect(() => {
        if (Object.values(news.data).length === 0) {
            dispatch(getNewsDataList());
        }
    }, []);

    useEffect(() => {
        if (news.data) {
            setDisplayNewsData(Object.values(news.data)
                .sort((a, b) => b.createdAt - a.createdAt));
        }
    }, [news.data]);

    const onPressGetMoreNewsData = useCallback(() =>
        dispatch(getNewsDataList()), []);

    return (<>
        <Navigator />
        <div className='heading_box'>
            <h2 className='heading'>お知らせ一覧</h2>
        </div>
        <div className={styles.news_container}>
            {displayNewsData.map(news => (
                <Link key={news.uid} href={`/news/detail/${news.uid}`} className={styles.news_content_container}>
                    <h4 className={styles.content_title}>{news.title}</h4>
                    <div className={styles.content_box}>
                        <img alt='' className={styles.content_img} src={news.imageUrls[0]} />
                        <p className={styles.content_text}>{news.content}</p>
                    </div>
                </Link>
            ))}
            {!news.isNoMore &&
                <div className={styles.more_button_box}>
                    <button className={styles.more_button}
                        onClick={onPressGetMoreNewsData}>MORE</button>
                </div>
            }
        </div>

    </>);
};
export default PageNum;