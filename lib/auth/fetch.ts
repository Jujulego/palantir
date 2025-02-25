import { FetchError } from '@/lib/utils/fetch';

export class Auth0RateLimit extends FetchError {
  constructor(readonly resetAt: number) {
    super(429, 'Rate limit limit reached');
  }
}

export async function auth0Fetch<D>(url: string | URL, options?: RequestInit): Promise<D> {
  while (true) {
    const res = await fetch(url, options);

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
      }
    }

    if (!res.ok) {
      throw new FetchError(res.status, await res.text());
    }

    return await res.json();
  }
}
