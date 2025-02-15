import { Auth0Client } from '@auth0/nextjs-auth0/server';
import { baseUrl } from './lib/utils/url';

export const auth0 = new Auth0Client({
  appBaseUrl: baseUrl(),
});
