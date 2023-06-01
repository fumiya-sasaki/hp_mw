import { IconProps } from "@/helper/svgHelper";
import { InstagramIcon } from "@/image/svg/InstagramIcon";
import Link from "next/link";
import React from "react";

const iconProps: IconProps = { color: 'black', width: '25', height: '25' };

export const Footer = React.memo(() => {
  return (
    <footer>
      <div className="footer_container">
        <div className="footer_nav">
          <Link className="footer_menu" href="/">ホーム</Link>
          <Link className="footer_menu" href="/news">ニュース</Link>
          <Link className="footer_menu" href="/gallery">ギャラリー</Link>
          <Link className="footer_menu" href="/contact">お問い合わせ</Link>
          <Link target="_blank" href="https://www.instagram.com/momoko_wakabayashi/">
            <InstagramIcon {...iconProps} />
          </Link>
        </div>
        <p className="copyrights">copyrights© momoko wakabayashi. All Rights Reserved.</p>
      </div>
    </footer>
  );
});
