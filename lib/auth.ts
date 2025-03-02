import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';

export async function getUserId() {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('sb-access-token')?.value;

  if (!accessToken) return null;

  const { data, error } = await supabase.auth.getUser(accessToken);
  if (error || !data.user) return null;

  return data.user.id;
}
