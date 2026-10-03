// Browser calls use NEXT_PUBLIC_API_URL; server components can use API_URL (internal network).
export const API_URL =
  (typeof window === 'undefined' ? process.env.API_URL : undefined) ??
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:4000/api/v1';

export class ApiRequestError extends Error {
  constructor(public status: number, message: string, public details?: Record<string, string[]>) {
    super(message);
  }
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...init.headers },
  });
  if (res.status === 204) return undefined as T;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiRequestError(res.status, data.error ?? 'Request failed', data.details);
  return data as T;
}
