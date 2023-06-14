import React, { useCallback } from 'react';
import styles from '@/styles/home.module.css'
import { useInView } from 'react-intersection-observer';
export const FadeinContent = React.memo(() => {
    const { ref: fadeInFirstRef, inView: fadeInFirstInView } = useInView({
        triggerOnce: true, rootMargin: '-50px'
    });

    const { ref: fadeInSecondRef, inView: fadeInSecondInView } = useInView({
        triggerOnce: true, rootMargin: '-50px'
    });

    const onScrollAddFadeInStyle = useCallback((isFadeIn: boolean) =>
        `${isFadeIn ? styles.fadeUp : undefined}`, []);
    return (
        <div className={styles.animation_container} >
            <div className={styles.animation_content_box}>
                <div ref={fadeInFirstRef} className={`${styles.animation_text_box} ${styles.fadein}` +
                    `${onScrollAddFadeInStyle(fadeInFirstInView)}`}>
                    <p className={`${styles.animation_text}` +
                        ` ${onScrollAddFadeInStyle(fadeInFirstInView)}`}>料理教室開催中</p>
                    <p className={`${styles.animation_text}` +
                        ` ${onScrollAddFadeInStyle(fadeInFirstInView)}`}>季節を感じる</p>
                </div>
                <div className={styles.box_first}></div>
                <img alt='' className={`${styles.animation_img} ${styles.fadein} ${onScrollAddFadeInStyle(fadeInFirstInView)}`}
                    src='fade_in_studio.JPG' />
            </div>
            <div className={styles.animation_content_box}>
            <div className={styles.box_second}></div>
                <img alt='' className={`${styles.animation_img} ${styles.fadein} ${onScrollAddFadeInStyle(fadeInSecondInView)}`}
                    src='fade_in_buy.JPG' />
                <div ref={fadeInSecondRef} className={`${styles.animation_text_box} ${styles.fadein}` +
                    `${onScrollAddFadeInStyle(fadeInSecondInView)}`}>
                    <p className={`${styles.animation_text}` +
                        ` ${onScrollAddFadeInStyle(fadeInSecondInView)}`}>随時開催中</p>
                    <p className={`${styles.animation_text}` +
                        ` ${onScrollAddFadeInStyle(fadeInSecondInView)}`}>お菓子販売</p>
                </div>
            </div>
        </div>
    );
});
