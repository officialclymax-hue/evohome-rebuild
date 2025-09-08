const API_BASE = process.env.API_BASE || 'https://evohome-rebuild.onrender.com';

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    // SSR fetch from server; revalidate as needed
    next: { revalidate: 60 }
  });
  if (!res.ok) throw new Error(`API ${path} -> ${res.status}`);
  return res.json() as Promise<T>;
}
