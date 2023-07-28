import { AdminState, BlobWithUrl, NewsBaseData, NewsEdit } from '@/common/types';
import { RootState, useAppDispatch } from '@/hooks/common';
import styles from '@/styles/admin.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { setNewNewsData } from '../../../redux/admin';
import { Redirect } from '@/components/admin/Redirect';

export const NewsEditDetail = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { pageId } = router.query;
    const admin: AdminState = useSelector((state: RootState) => state.admin);

    const [uid, setUid] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [imageUrls, setImageUrls] = useState<BlobWithUrl[]>([]);
    const [createdAt, setCreatedAt] = useState<number>(0);

    const submitNewsData = useCallback(() => {
        const newsEdit: NewsEdit = {
            uid, title, content,
            imageUrls, createdAt
        };
        dispatch(setNewNewsData(newsEdit));
    }, [uid, title, content, imageUrls, createdAt]);

    useEffect(() => {
        const newsBaseData: NewsBaseData = admin.newsData[Number(pageId)];
        if (newsBaseData) {
            setUid(newsBaseData.uid);
            setTitle(newsBaseData.title);
            setContent(newsBaseData.content);
            setImageUrls(newsBaseData.imageUrls.map(url => {
                const onlyUrl: BlobWithUrl = { url };
                return onlyUrl;
            }));
            setCreatedAt(newsBaseData.createdAt);
        };
    }, [admin.newsData]);

    const addImageUrls = useCallback((files: FileList | null) => {
        if (files) {
            const blobImageUrls: BlobWithUrl[] = Array.from(files).map((blob: Blob) => {
                const blobImageUrl: BlobWithUrl = { blob, url: URL.createObjectURL(blob) };
                return blobImageUrl;
            });
            setImageUrls(blobImageUrls);
        };
    }, []);

    return (
        <div>
            <Redirect />
            {admin.isLogin && <>
                <div>
                    <p>タイトル</p>
                    <input id={'title'} type={'text'} value={title} className={styles.news_form_title}
                        required onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <p>コンテント</p>
                    <textarea id='content' value={content} className={styles.news_form_content}
                        required onChange={(e) => setContent(e.target.value)} />
                </div>
                <div>
                    <input id={'title'} type={'file'} multiple
                        required onChange={(e) => addImageUrls(e.target.files)} />
                </div>
                <div>
                    <img alt='' className={styles.content_img} src={imageUrls[0] ? imageUrls[0].url : ''} />
                </div>

                <button onClick={submitNewsData}>Submit</button>
                <div>
                    <Link href='/admin/news'>NEWSに戻る</Link>
                </div></>}
        </div>
    )
};

export default NewsEditDetail;