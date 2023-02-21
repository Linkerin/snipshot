import { AuthChangeEvent, createClient, Session } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

type UpdateCookiesFunc = (
  event: AuthChangeEvent,
  session: Session | null
) => void;

export const updateCookies: UpdateCookiesFunc = async (event, session) => {
  await fetch('/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify({ event, session })
  });
};

export default supabase;
