import ipaddr from 'ipaddr.js';

export async function reverseDnsLookup(ip: string) {
  const parsed = ipaddr.parse(ip);
  const url = new URL('https://dns.google/resolve');
  url.searchParams.set('type', '12');

  if (parsed.kind() === 'ipv4') {
    url.searchParams.set('name', `${parsed.toByteArray().reverse().join('.')}.in-addr.arpa`);
  } else {
    throw new Error('ipv6 to be handled');
  }

  const res = await fetch(url);
  const { Answer } = await res.json();

  return Answer?.[0]?.data;
}