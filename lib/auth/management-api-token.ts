import { jsonFetch } from '@/lib/utils/fetch';
import { cache } from 'react';

let rawToken = '';
let expiryTime = 0;

export const managementApiToken = cache(async (): Promise<string> => {
  if (expiryTime > new Date().getTime()) {
    console.log('[auth0] Reuse cached management token');
    return rawToken;
  }

  console.log('[auth0] Load new token for management');
  const res = await jsonFetch<OAuthTokenResponse>(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      grant_type: 'client_credentials',
    }),
    next: {
      revalidate: 0
    }
  });

  console.log(`[auth0] Loaded management token valid for ${res.expires_in} seconds`);
  rawToken = res.access_token;
  expiryTime = new Date().getTime() + res.expires_in * 1000;

  return rawToken;
});

// Types
interface OAuthTokenResponse {
  readonly access_token: string;
  readonly token_type: string;
  readonly expires_in: number;
}