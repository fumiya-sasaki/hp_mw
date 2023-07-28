import { useCallback, useState } from 'react';
import { useRouter } from 'next/router'
import { FireBase } from '@/core/firebase';

export const Login = () => {
  const router = useRouter();
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const loginSubmit = useCallback(async () => {
    try {
      await FireBase.signInEmail(email, password);
      router.push('/admin');
    } catch (error) {
      alert('メールアドレスまたはパスワードが間違っています');
    }
  }, [email, password]);

  return (
    <div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={loginSubmit}>ログイン</button>
    </div>
  );
};

export default Login;
