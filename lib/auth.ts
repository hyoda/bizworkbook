import { supabase } from '@/lib/supabase';

export async function getUserId() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Session check failed:', error);
      return null;
    }

    return session?.user?.id || null;
  } catch (error) {
    console.error('Auth check failed:', error);
    return null;
  }
}

export async function checkAuth() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Auth check failed:', error);
      return false;
    }

    return !!session;
  } catch (error) {
    console.error('Auth check failed:', error);
    return false;
  }
}

export async function refreshSession() {
  try {
    const { data: { session }, error } = await supabase.auth.refreshSession();
    
    if (error) {
      console.error('Session refresh failed:', error);
      return null;
    }

    return session;
  } catch (error) {
    console.error('Session refresh failed:', error);
    return null;
  }
}
