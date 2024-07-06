'use client';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import ipaddr from 'ipaddr.js';
import { useMemo } from 'react';

export interface IpTagsProps {
  readonly ip: string;
}

export default function IpTags({ ip }: IpTagsProps) {
  const parsed = useMemo(() => ipaddr.isValid(ip) ? ipaddr.parse(ip) : null, [ip]);

  return <Collapse in={parsed !== null}>
    <Box sx={{ my: 0.5, pl: 2, height: 24 }}>
      { parsed && (
        <>
          <Chip label={parsed.kind()} color="primary" size="small" />
          <Chip label={parsed.range()} color="secondary" size="small" sx={{ ml: 0.5 }} />
        </>
      ) }
    </Box>
</Collapse>;
}

const dbg = <T = unknown>(v: T): T => {
  console.log(v);
  return v;
}
