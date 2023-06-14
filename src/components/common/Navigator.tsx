import React, { useState } from 'react';
import styles from '../../styles/nanvigator.module.css';
import { InstagramIcon } from '@/image/svg/InstagramIcon';
import { IconProps } from '@/helper/svgHelper';
import Link from 'next/link';

const iconProps: IconProps = { width: '24', height: '24' };

export const Navigator = React.memo(({
  isChange
}: {
  isChange?: boolean;
}) => {
  const [isVisial, setIsVisial] = useState<boolean>(false);
  const onClick = () => setIsVisial(prev => !prev)
  return (<>
    <div className={`${styles.openbtn} ${isVisial ? styles.active : undefined}`} onClick={onClick}>
      <span className={!isChange ? styles.btn_gray : styles.btn_white}></span>
      <span className={!isChange ? styles.btn_gray : styles.btn_white}></span>
      <span className={!isChange ? styles.btn_gray : styles.btn_white}></span>
    </div>
    <nav className={`${styles.media_nav} ${isVisial ? styles.panelactive : undefined}`}>
      <ul>
        <li><Link href='/'>home</Link></li>
        <li><Link href='/news'>news</Link></li>
        <li><Link href='/gallery'>gallery</Link></li>
        <li><Link href='/contact'>contact</Link></li>
        <li><Link target='_blank' href='https://www.instagram.com/momoko_wakabayashi/'>
          <InstagramIcon {...iconProps} color={'white'} /></Link></li>
      </ul>
    </nav>
    <nav className={styles.nav_base}>
      <ul className={`${styles.header_nav} ${!isChange ? styles.nav_bg_color : styles.nav_bg_color_home}`}>
        <li><Link className={`menu ${!isChange ? styles.menu_color : styles.menu_color_white}`} href='/'>home</Link></li>
        <li><Link className={`menu ${!isChange ? styles.menu_color : styles.menu_color_white}`} href='/news'>news</Link></li>
        <li><Link className={`menu ${!isChange ? styles.menu_color : styles.menu_color_white}`} href='/gallery'>gallery</Link></li>
        <li><Link className={`menu ${!isChange ? styles.menu_color : styles.menu_color_white}`} href='/contact'>contact</Link></li>
        <li><Link target='_blank' href='https://www.instagram.com/momoko_wakabayashi/'>
          <InstagramIcon {...iconProps} color={isChange ? 'white' : 'black'} /></Link></li>
      </ul >
    </nav >
  </>
  );
});
