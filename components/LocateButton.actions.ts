'use server';

import ipaddr from 'ipaddr.js';
import { headers } from 'next/headers';

// Methods
export async function clientIp() {
  const ip = (await headers()).get('X-Forwarded-For');

  if (ip !== null) {
    return ipaddr.parse(ip).toString();
  }

  return null;
}
