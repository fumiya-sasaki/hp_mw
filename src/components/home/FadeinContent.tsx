import React, { useCallback } from "react";
import styles from '@/styles/home.module.css'
import { useInView } from "react-intersection-observer";
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
                <img className={`${styles.animation_img} ${styles.fadein} ${onScrollAddFadeInStyle(fadeInFirstInView)}`}
                    src="3D5AAEEB-540B-4A23-87F3-B90DD4B57CCB.JPG" />
            </div>
            <div className={styles.animation_content_box}>
                <img className={`${styles.animation_img} ${styles.fadein} ${onScrollAddFadeInStyle(fadeInSecondInView)}`}
                    src="3D5AAEEB-540B-4A23-87F3-B90DD4B57CCB.JPG" />
                <div ref={fadeInSecondRef} className={`${styles.animation_text_box} ${styles.fadein}` +
                    `${onScrollAddFadeInStyle(fadeInSecondInView)}`}>
                    <p className={`${styles.animation_text}` +
                        ` ${onScrollAddFadeInStyle(fadeInSecondInView)}`}>料理教室開催中</p>
                    <p className={`${styles.animation_text}` +
                        ` ${onScrollAddFadeInStyle(fadeInSecondInView)}`}>季節を感じる</p>
                </div>
            </div>
        </div>
    );
});
