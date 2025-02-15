import type { DnsResponse } from '@/lib/dns/dns.dto';
import { jsonFetch } from '@/lib/utils/fetch';
import ipaddr from 'ipaddr.js';

export async function reverseDnsLookup(ip: string): Promise<string | null> {
  const parsed = ipaddr.parse(ip);
  const url = new URL('https://dns.google/resolve');
  url.searchParams.set('type', '12');

  if (parsed.kind() === 'ipv4') {
    url.searchParams.set('name', `${parsed.toByteArray().reverse().join('.')}.in-addr.arpa`);
  } else {
    const digits = parsed.toByteArray().map((v) => [(v >> 4).toString(16), (v % 16).toString(16)]).flat();
    url.searchParams.set('name', `${digits.reverse().join('.')}.ip6.arpa`);
  }

  const response = await jsonFetch<DnsResponse>(url);

  if (response.Answer) {
    return response.Answer[0].data.slice(0, -1);
  } else {
    return null;
  }
}
