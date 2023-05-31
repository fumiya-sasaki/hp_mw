import { Navigator } from "@/components/common/Navigator";
import styles from '@/styles/news.module.css'
import { newsData } from "@/helper/displayData";

export const News = () => {
    return (<>
        <Navigator />
        <div className="heading_box">
            <h2 className="heading">お知らせ一覧</h2>
        </div>
        <div className={styles.news_container}>
            {newsData.map(news => (
                <div key={news.title} className={styles.news_content_container}>
                    <h5 className={styles.content_title}>{news.title}</h5>
                    <div className={styles.content_box}>
                        <img className={styles.content_img} src={news.img} />
                        <p className={styles.content_text}>{news.text}</p>
                    </div>
                    <hr className={styles.hr_content} />
                </div>
            ))}
        </div>
    </>);
};
export default News;