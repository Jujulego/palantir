import ipaddr from 'ipaddr.js';

const ONE_DAY = 86400;

export function ipCacheDuration(ip: string) {
  const parsed = ipaddr.parse(ip);

  return ['private', 'loopback'].includes(parsed.range()) ? false : ONE_DAY;
}
