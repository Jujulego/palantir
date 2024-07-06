import ipaddr from 'ipaddr.js';

const ONE_DAY = 86400;

export function ipCacheDuration(ip: ipaddr.IPv4 | ipaddr.IPv6) {
  return ['private', 'loopback'].includes(ip.range()) ? false : ONE_DAY;
}
