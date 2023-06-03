import { Navigator } from '@/components/common/Navigator';
import styles from '@/styles/home.module.css'
import { useInView } from 'react-intersection-observer';
import { HomeSwiper } from '@/components/home/HomeSwiper';
import { FadeinContent } from '@/components/home/FadeinContent';
import { NewsContent } from '@/components/home/NewsContent';

export const Home = () => {
  const { ref: navRef, inView: navInView } = useInView({ rootMargin: '-40px' });
  return (
    <>
      <Navigator isChange={navInView} />
      <h2 className={styles.title}>Momoko Wakabayashi</h2>
      <div ref={navRef}>
        <img className={styles.top} src='3D5AAEEB-540B-4A23-87F3-B90DD4B57CCB.JPG' />
      </div>
      <hr className={styles.vertical_hr} />
      <FadeinContent />
      <NewsContent />
      <div className={styles.swiper_wrapper}>
        <p className={styles.swiper_title}>collection</p>
        <HomeSwiper />
      </div>
      <div>
        <div className='swiper_pagination'></div>
      </div>
      <div className={styles.profiel_box}>
        <p className={styles.news_title}>PROFIEL</p>
        <div className={styles.profiel_content_box}>
          <img className={styles.profiel} src='3D5AAEEB-540B-4A23-87F3-B90DD4B57CCB.JPG' />
          <p className={styles.profiel_text}>
            若林桃子です。若林桃子です。若林桃子です。若林桃子です。若林桃子です。若林桃子です。若林桃子です。若林桃子です。
            若林桃子です。若林桃子です。若林桃子です。若林桃子です。若林桃子です。若林桃子です。若林桃子です。若林桃子です。
            若林桃子です。若林桃子です。若林桃子です。若林桃子です。若林桃子です。若林桃子です。若林桃子です。若林桃子です。
            若林桃子です。若林桃子です。若林桃子です。若林桃子です。若林桃子です。若林桃子です。若林桃子です。若林桃子です。
            若林桃子です。若林桃子です。若林桃子です。若林桃子です。若林桃子です。若林桃子です。若林桃子です。若林桃子です。
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
