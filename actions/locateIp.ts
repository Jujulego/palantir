'use server';

import ipaddr from 'ipaddr.js';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

// Utils
export async function locateIp() {
  const ip = (await headers()).get('X-Forwarded-For');

  if (ip) {
    const parsed = ipaddr.parse(ip);
    redirect(`/ip/${parsed.toString()}`);
  } else {
    redirect('/');
  }
}
