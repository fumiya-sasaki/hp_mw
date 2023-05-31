import React from "react";
import styles from '@/styles/home.module.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper'
import { collectionData } from "@/helper/displayData";

export const HomeSwiper = React.memo(() => {
    return (
        <Swiper
            navigation={{
                enabled: true,
                nextEl: ".custom_swiper_button_next",
                prevEl: ".custom_swiper_button_prev"
            }}
            pagination={{
                enabled: true,
                clickable: true,
                el: ".swiper_pagination",
                type: "bullets",
                bulletClass: `swiper-pagination-bullet ${styles.swiper_pagination_bullet}`,
                bulletActiveClass: `swiper-pagination-bullet-active ${styles.swiper_pagination_bullet_active}`,
            }}
            slidesPerView={2}
            centeredSlides={true}
            modules={[Navigation, Pagination]}
            className={styles.swiper}>
            {collectionData.map((content: { title: string, img: string }, index: number) =>
                <SwiperSlide key={index} className={styles.swiper_slide}>
                    <img className={styles.swiper_img} src={content.img} />
                    <p>{content.title}</p>
                </SwiperSlide>
            )}
            <div>
                <div className="custom_swiper_button_prev"></div>
                <div className="custom_swiper_button_next"></div>
            </div>
        </Swiper>
    );
});
