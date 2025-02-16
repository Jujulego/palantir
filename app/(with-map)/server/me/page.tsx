import ipaddr from 'ipaddr.js';
import { headers } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';

export default async function WithMapServerMePage() {
  let ip = (await headers()).get('X-Forwarded-For');

  if (ip !== null) {
    ip = ipaddr.parse(ip).toString();
    redirect(`/server/${encodeURIComponent(ip)}/ip-info`, RedirectType.replace);
  }

  redirect('/');
}
