'use server';

import { headers } from 'next/headers';

// Utils
export async function getClientIp() {
  return headers().get('X-Forwarded-For');
}