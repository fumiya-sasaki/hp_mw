import { Navigator } from '@/components/common/Navigator';
import styles from '@/styles/detail.module.css'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { NewsBaseData, NewsData } from '@/common/types';
import { useEffect } from 'react';
import { RootState, useAppDispatch } from '@/hooks/common';
import { getPinpointNewsData } from '@/redux/news';

export const PageId = () => {
    const router = useRouter();
    const { pageId } = router.query;
    const news: NewsData = useSelector((state: RootState) => state.news.data);
    const newsData: NewsBaseData = news[Number(pageId)];
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!pageId) {
            const urls: string[] = window.location.href.split('/').filter(item => item !== '')
            dispatch(getPinpointNewsData(urls[urls.length - 1]));
        }
    }, [pageId]);

    return (<>
        <Navigator />
        {newsData && <>
            <div className='heading_box'>
                <h2 className='heading'>{newsData.title}</h2>
            </div>
            <div className={styles.detail_container}>
                <div className={styles.detail_content_box}>
                    <img className={styles.detail_img} src={newsData.imageUrls[0]} alt='' />
                    <p className={styles.detail_text}>{newsData.content}</p>
                </div>
            </div>
        </>}
        <div className={styles.back_button_container}>
            <div className={styles.back_button_box}>
                <Link className={styles.back_button} href='/news'>一覧へ</Link>
            </div>
        </div>
    </>);
};
export default PageId;