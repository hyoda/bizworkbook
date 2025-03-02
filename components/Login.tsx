'use client';

import { supabase } from '@/lib/supabase';

export default function Login() {
  async function handleLogin(provider: 'google' | 'github' | 'kakao') {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) console.error('로그인 오류:', error.message);
  }

  return (
    <div className="flex flex-col space-y-4">
      <button onClick={() => handleLogin('google')} className="bg-red-500 text-white px-4 py-2 rounded">
        Google 로그인
      </button>
      <button onClick={() => handleLogin('github')} className="bg-gray-800 text-white px-4 py-2 rounded">
        GitHub 로그인
      </button>
      <button onClick={() => handleLogin('kakao')} className="bg-yellow-400 text-black px-4 py-2 rounded">
        카카오 로그인
      </button>
    </div>
  );
}
