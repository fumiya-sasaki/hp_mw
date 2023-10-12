import React from 'react';
import styles from '@/styles/swiper.module.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper'
import { Collection } from '@/helper/displayData';

export const CustomSwiper = React.memo(({
    contents, width, isNavigation
}: {
    contents: Collection[] | string[], width?: number, isNavigation?: boolean
}) => {
    return (
        <Swiper
            navigation={isNavigation ? {
                enabled: true,
                nextEl: '.custom_swiper_button_next',
                prevEl: '.custom_swiper_button_prev'
            } : undefined}
            pagination={{
                enabled: true,
                clickable: true,
                el: '.swiper_pagination',
                type: 'bullets',
                bulletClass: `swiper-pagination-bullet ${styles.swiper_pagination_bullet}`,
                bulletActiveClass: `swiper-pagination-bullet-active ${styles.swiper_pagination_bullet_active}`,
            }}
            slidesPerView={width ? width > 800 ? 2 : 1 : 1}
            centeredSlides={true}
            modules={[Navigation, Pagination]}
            className={styles.swiper}>
            {contents.map((content: Collection | string, index: number) =>
                <SwiperSlide key={index} className={styles.swiper_slide}>
                    {typeof (content) === 'string' ?
                        <img alt='' className={styles.detail_img} src={content} /> :
                        <><img alt='' className={styles.swiper_img} src={content.img} />
                            <p>{content.title}</p></>}
                </SwiperSlide>)
            }
            {isNavigation &&
                <div>
                    <div className='custom_swiper_button_prev'></div>
                    <div className='custom_swiper_button_next'></div>
                </div>
            }
        </Swiper>
    );
});
