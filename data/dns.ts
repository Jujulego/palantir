import ipaddr from 'ipaddr.js';

export async function reverseDnsLookup(ip: string) {
  const parsed = ipaddr.parse(ip);
  const url = new URL('https://dns.google/resolve');
  url.searchParams.set('type', '12');

  if (parsed.kind() === 'ipv4') {
    url.searchParams.set('name', `${parsed.toByteArray().reverse().join('.')}.in-addr.arpa`);
  } else {
    const digits = parsed.toByteArray().map((v) => [(v >> 4).toString(16), (v % 16).toString(16)]).flat();
    url.searchParams.set('name', `${digits.reverse().join('.')}.ip6.arpa`);
  }

  const res = await fetch(url);
  const { Answer } = await res.json();

  return Answer?.[0]?.data;
}