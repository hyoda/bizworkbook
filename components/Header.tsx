import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/');
  }

  return (
    <header className="bg-white shadow-md p-4 flex justify-between">
      <h1 className="text-xl font-bold">BizWorkbook</h1>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
        로그아웃
      </button>
    </header>
  );
}
