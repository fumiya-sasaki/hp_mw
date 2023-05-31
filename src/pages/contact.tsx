import { Navigator } from "@/components/common/Navigator";
import styles from '@/styles/contact.module.css'
import { useCallback, useMemo } from "react";

export const Contant = () => {
    const Required: JSX.Element = useMemo(() =>
        <span className={styles.form_item_label_required}>*</span>, []);

    const FormItem = useCallback((id: string, name: string) => <div className={styles.form_item}>
        <p className={styles.form_item_label}>{Required}{name}</p>
        <input id={id} type={id === "email" ? "email" : "text"} className={styles.form_item_input} required />
    </div>, []);

    return (<>
        <Navigator />
        <div className="heading_box">
            <h2 className="heading">お問い合わせ</h2>
        </div>
        <form id="form" className={styles.form_container}>
            <div className={styles.required_title_box}>
                <p className={styles.confirm}>{Required}は必須項目になります</p>
            </div>
            {FormItem("name", "氏名")}
            {FormItem("email", "メールアドレス")}
            {FormItem("phone_num", "電話番号")}
            {FormItem("title", "件名")}
            <div className={styles.form_item}>
                <p className={`${styles.form_item_label} ${styles.isMsg}`}>{Required}お問合せ内容</p>
                <textarea id="content" className={`${styles.form_item_input} ` +
                    `${styles.form_item_textarea}`} required />
            </div>
            <input type="submit" id="button" className={styles.form_btn} value="送信する" />
        </form>
    </>);
};
export default Contant;