export const createUid = (date: Date): string => {
    let uid = date.getFullYear().toString();
    uid = uid + date.getMonth().toString().padStart(2, '0');
    uid = uid + date.getDay().toString().padStart(2, '0');
    uid = uid + date.getHours().toString().padStart(2, '0');
    uid = uid + date.getMinutes().toString().padStart(2, '0');
    uid = uid + date.getSeconds().toString().padStart(2, '0');
    return (99999999999999 - Number(uid)).toString();
};