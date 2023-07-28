import { FireBase } from "@/core/firebase";
import { useAppDispatch } from "@/hooks/common";
import { onChangeIsLogin } from "@/redux/admin";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const Redirect = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    useEffect(() => {
        FireBase.getCurrentUser(currentUser => {
            dispatch(onChangeIsLogin(!!currentUser));
            if (!currentUser) {
                router.replace('/');
            };
        });
    }, []);
    return <></>;
};