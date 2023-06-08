import { Navigator } from '@/components/common/Navigator';
import styles from '@/styles/gallery.module.css'
import { useCallback, useEffect, useState } from 'react';

const limit = 9;
const businessID = process.env.NEXT_PUBLIC_INSTA_BUSINESS_ID
const businessToken = process.env.NEXT_PUBLIC_INSTA_BUSINESS_TOKEN;
export const Gallery = () => {
    const [instData, setInstData] = useState<any>();
    const getInstaImage = useCallback(() => {
        fetch(`https://graph.facebook.com/v5.0/${businessID}?` +
            `fields=name%2Cmedia.limit(${limit})%7Bcaption%2` +
            `Clike_count%2Cmedia_url%2Cpermalink%2Ctimestamp%2` +
            `Cthumbnail_url%2Cmedia_type%2Cusername%7D&access_token=${businessToken}`)
            .then((response) => response.json())
            .then(data => setInstData(data.media.data));
    }, []);

    useEffect(() => {
        getInstaImage()
    }, []);

    return (<>
        <Navigator />
        <div className='heading_box'>
            <h2 className='heading'>instagram gallery</h2>
        </div>
        <div className={styles.wrap}>
            <div className={styles.img_container}>
                {instData && instData.map((data: any, index: number) => (
                    <a key={index} href={data.permalink} className={styles.content} target='qoo_insta'>
                        <img className={styles.content} src={data.media_url} />
                    </a>
                ))}
            </div>
        </div>
    </>);
};
export default Gallery;