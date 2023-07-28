import { Navigator } from '@/components/common/Navigator';
import styles from '@/styles/contact.module.css'
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { init, send } from "emailjs-com";

const key = process.env.NEXT_PUBLIC_EJS_INIT_KEY;
const serviceID = process.env.NEXT_PUBLIC_EJS_SERVICE_ID;
const templateID = process.env.NEXT_PUBLIC_EJS_TEMPLATE_ID;

export const Contanct = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const Required: JSX.Element = useMemo(() =>
        <span className={styles.form_item_label_required}>*</span>, []);

    const FormItem = useCallback((id: string, name: string, setValue: Dispatch<SetStateAction<string>>) =>
        <div className={styles.form_item}>
            <p className={styles.form_item_label}>{Required}{name}</p>
            <input id={id} type={id === 'email' ? 'email' : 'text'}
                className={styles.form_item_input} required onChange={(e) => setValue(e.target.value)} />
        </div>, []);

    const onSubmit = useCallback(async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        if (key && serviceID && templateID && name && email && title && message && phoneNumber) {
            init(key)
            const params = { name, email, title, message, phoneNumber }
            try {
                await send(serviceID, templateID, params).then(() =>
                    alert('お問合せありがとうございます。\n' +
                        'お問合せ内容を確認次第ご返信させていただきます。'))
            } catch (error) {
                alert('送信に失敗しました。\nブラウザを立ち上げ直してもう一度送信してください。\n' +
                    '送信できない場合お手数ですがインスタグラムよりご連絡ください。');
            }
        }
    }, [key, serviceID, templateID, name,
        email, title, message, phoneNumber]);

    return (<>
        <Navigator />
        <div className='heading_box'>
            <h2 className='heading'>お問い合わせ</h2>
        </div>
        <form id='form' className={styles.form_container} onSubmit={onSubmit}>
            <div className={styles.required_title_box}>
                <p className={styles.confirm}>{Required}は必須項目になります</p>
            </div>
            {FormItem('name', '氏名', setName)}
            {FormItem('email', 'メールアドレス', setEmail)}
            {FormItem('phone_num', '電話番号', setPhoneNumber)}
            {FormItem('title', '件名', setTitle)}
            <div className={styles.form_item}>
                <p className={`${styles.form_item_label} ${styles.isMsg}`}>{Required}お問合せ内容</p>
                <textarea id='content' className={`${styles.form_item_input} ` +
                    `${styles.form_item_textarea}`} required onChange={(e) => setMessage(e.target.value)} />
            </div>
            <input type='submit' id='button' className={styles.form_btn} value='送信する' />
        </form>
    </>);
};
export default Contanct;