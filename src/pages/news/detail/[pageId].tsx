import { Navigator } from '@/components/common/Navigator';
import styles from '@/styles/detail.module.css'
import { NewsData, newsState } from '@/helper/displayData';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const News = () => {
    const router = useRouter();
    const { pageId } = router.query;
    const newsData: NewsData = newsState[Number(pageId)];
    return (<>
        <Navigator />
        {pageId && <>
            <div className='heading_box'>
                <h2 className='heading'>{newsData.title}</h2>
            </div>
            <div className={styles.detail_container}>
                <div className={styles.detail_content_box}>
                    <img className={styles.detail_img} src={newsData.img} alt='' />
                    <p className={styles.detail_text}>{newsData.text}</p>
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
export default News;