import React from 'react';
import styles from '../../styles/nanvigator.module.css';
import { InstagramIcon } from '@/image/svg/InstagramIcon';
import { IconProps } from '@/helper/svgHelper';
import Link from 'next/link';

const iconProps: IconProps = { width: '25', height: '25' };

export const Navigator = React.memo(({
  isChange
}: {
  isChange?: boolean;
}) => {
  return (
    <nav className="header_nav">
      <ul className={`header_nav ${!isChange ? styles.nav_bg_color : styles.nav_bg_color_home}`}>
        <li><Link className={`menu ${!isChange ? styles.menu_color : styles.menu_color_white}`} href="/">home</Link></li>
        <li><Link className={`menu ${!isChange ? styles.menu_color : styles.menu_color_white}`} href="news">news</Link></li>
        <li><Link className={`menu ${!isChange ? styles.menu_color : styles.menu_color_white}`} href="/gallery">gallery</Link></li>
        <li><Link className={`menu ${!isChange ? styles.menu_color : styles.menu_color_white}`} href="/contact">contact</Link></li>
        <li><Link target="_blank" href="https://www.instagram.com/momoko_wakabayashi/">
          <InstagramIcon {...iconProps} color={isChange ? 'white' : 'black'} /></Link></li>
      </ul>
    </nav >
  );
});
