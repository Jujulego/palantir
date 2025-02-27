import { managementApiToken } from '@/lib/auth/management-api-token';
import { FetchError } from '@/lib/utils/fetch';
import { revalidateTag } from 'next/cache';

export async function auth0Fetch<D>(url: string | URL, options: RequestInit = {}): Promise<D> {
  // Add token
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${await managementApiToken()}`
  };

  while (true) {
    // Try api call
    const res = await fetch(url, options);

    if (res.status === 401) {
      console.warn('[auth0] Unauthorized call revalidating token');
      
      revalidateTag('auth0-management-token');

      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${await managementApiToken()}`
      };

      continue;
    }

    if (res.status === 429) {
      const now = new Date().getTime();
      let reset = now;

      if (res.headers.get('x-ratelimit-reset')) {
        reset = parseInt(res.headers.get('x-ratelimit-reset')!) * 1000;
      }

      const delay = reset - now;

      if (delay > 0) {
        console.warn(`[auth0] Rate limit reached waiting for ${delay}ms (reset at ${new Date(reset).toISOString()})`);
        await new Promise(resolve => setTimeout(resolve, delay));

        continue;
      } else {
        console.error(`[auth0] Rate limit reached (reset at ${new Date(reset).toISOString()})`);
      }
    }

    if (!res.ok) {
      throw new FetchError(res.status, await res.text());
    }

    return await res.json();
  }
}
