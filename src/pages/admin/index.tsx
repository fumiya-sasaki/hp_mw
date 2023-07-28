import { Redirect } from '@/components/admin/Redirect';
import { FireBase } from '@/core/firebase';
import { RootState } from '@/hooks/common';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

export const AdminHome = () => {
    const router = useRouter();
    const isLogin: boolean = useSelector((state: RootState) => state.admin.isLogin);

    const logout = useCallback(async () => {
        await FireBase.signOutAuth();
        router.replace('admin/login');
    }, []);

    return (
        <div>
            <Redirect />
            {isLogin && <>
                <Link href='/admin/news'>NEWS</Link>
                <button onClick={logout}>LOGOUT</button>
            </>}
        </div>
    )
};

export default AdminHome;