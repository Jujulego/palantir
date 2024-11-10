import { jsonFetch } from '@/utils/fetch';
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

export interface DnsResponse {
  readonly Status: number;
  readonly TC: boolean;
  readonly RD: boolean;
  readonly RA: boolean;
  readonly AD: boolean;
  readonly CD: boolean;
  readonly Question: readonly DnsQuestion[],
  readonly Answer?: readonly DnsAnswer[];
  readonly Comment?: string;
  readonly edns_client_subnet?: string;
}

export interface DnsQuestion {
  readonly name: string;
  readonly type: number;
}

export interface DnsAnswer {
  readonly name: string;
  readonly type: number;
  readonly TTL: number;
  readonly data: string;
}
