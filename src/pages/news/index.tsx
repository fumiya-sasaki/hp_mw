import { Navigator } from '@/components/common/Navigator';
import styles from '@/styles/news.module.css'
import { newsData } from '@/helper/displayData';
import Link from 'next/link';

export const News = () => {
    return (<>
        <Navigator />
        <div className='heading_box'>
            <h2 className='heading'>お知らせ一覧</h2>
        </div>
        <div className={styles.news_container}>
            {newsData.map(news => (
                <Link key={news.id } href={`news/detail/${news.id}`} className={styles.news_content_container}>
                    <h4 className={styles.content_title}>{news.title}</h4>
                    <div className={styles.content_box}>
                        <img alt='' className={styles.content_img} src={news.img} />
                        <p className={styles.content_text}>{news.text}</p>
                    </div>
                </Link>
            ))}
        </div>
     
    </>);
};
export default News;