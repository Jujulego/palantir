'use client';

import { useDnsLookup } from '@/hooks/useDnsLookup';
import MenuItem from '@mui/material/MenuItem';

export interface DnsLookupItemsProps {
  readonly dns: string;
  readonly onSelect: (ip: string) => void;
}

export function DnsLookupItems({ dns, onSelect }: DnsLookupItemsProps) {
  const { ips } = useDnsLookup(dns);

  return ips.map((ip) => (
    <MenuItem key={ip} onClick={() => onSelect(ip)}>
      { ip }
    </MenuItem>
  ));
}