import { SUPABASE_ANON_KEY, SUPABASE_URL } from './config';

/** Small fetch helper for Supabase REST. Read-only tables + the web_* functions only. */
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  });
  const text = await r.text();
  let body: unknown = null;
  try { body = text ? JSON.parse(text) : null; } catch { /* not json */ }
  if (!r.ok) {
    const msg = (body as { message?: string } | null)?.message || 'Something went wrong. Please try again.';
    throw new Error(msg);
  }
  return body as T;
}

export const rpc = <T>(fn: string, args: Record<string, unknown>) =>
  api<T>(`rpc/${fn}`, { method: 'POST', body: JSON.stringify(args) });
