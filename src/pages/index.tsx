import { Navigator } from '@/components/common/Navigator';
import styles from '@/styles/home.module.css'
import { useInView } from 'react-intersection-observer';
import { FadeinContent } from '@/components/home/FadeinContent';
import { NewsContent } from '@/components/home/NewsContent';
import { CustomSwiper } from '@/components/common/CustomSwiper';
import { GetWindowSize } from '@/hooks/GetWindowSize';
import { collectionData } from '@/helper/displayData';

export const Home = () => {
  const { ref: navRef, inView: navInView } = useInView({ rootMargin: '-40px' });
  const { width } = GetWindowSize();
  return (
    <>
      <Navigator isChange={navInView} />
      <h2 className={styles.title}>Momoko Wakabayashi</h2>
      <div ref={navRef}>
        <img alt='' className={styles.top} src='top.JPG' />
      </div>
      <hr className={styles.vertical_hr} />
      <FadeinContent />
      <NewsContent />
      <div className={styles.swiper_wrapper}>
        <p className={styles.swiper_title}>collection</p>
        <CustomSwiper contents={collectionData} width={width} isNavigation />
      </div>
      <div>
        <div className='swiper_pagination'></div>
      </div>
      <div className={styles.profiel_box}>
        <p className={styles.news_title}>PROFIEL</p>
        <div className={styles.profiel_content_box}>
          <img alt='' className={styles.profiel} src='profiel.JPG' />
          <p className={styles.profiel_text}>
            越谷市出身。大学卒業後により深く料理を学びたいと思い調理師専門学校へ。
            そこで栄養学を学び、卒業後は幼稚園の栄養士として勤務。
            より料理を学ぶ為、都内1つ星フランス料理店で修行しながら、料理家のアシスタントとして経験を積む。
            料理教室やお菓子販売、イベント出店を随時開催中。
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
