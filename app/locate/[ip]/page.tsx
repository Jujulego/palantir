import Box from '@mui/material/Box';
import ipaddr from 'ipaddr.js';
import { notFound } from 'next/navigation';

import BigDataCloudCard from '@/src/big-data-cloud/BigDataCloudCard';
import IpDataCard from '@/src/ip-data/IpDataCard';
import IpGeolocationCard from '@/src/ip-geolocation/IpGeolocationCard';
import IpInfoCard from '@/src/ip-info/IpInfoCard';
import IpQualityCard from '@/src/ip-quality/IpQualityCard';

// Page
export interface LocateIpPageProps {
  readonly params: {
    readonly ip: string;
  }
}

export default async function LocateIpPage({ params }: LocateIpPageProps) {
  const ip = decodeURIComponent(params.ip);

  if (!ipaddr.isValid(ip)) {
    notFound();
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex', flexDirection: 'column', gap: 1,
          m: -0.5,
          p: 0.5,
          gridArea: {
            xs: '2 / 1 / 2 / span 2',
            sm: '2 / 1',
          },
          overflow: 'auto',
        }}
      >
        <BigDataCloudCard ip={ip} sx={{ flexShrink: 0, pointerEvents: 'auto' }} />
        <IpDataCard ip={ip} sx={{ flexShrink: 0, pointerEvents: 'auto' }} />
        <IpGeolocationCard ip={ip} sx={{ flexShrink: 0, pointerEvents: 'auto' }} />
        <IpInfoCard ip={ip} sx={{ flexShrink: 0, pointerEvents: 'auto' }} />
        <IpQualityCard ip={ip} sx={{ flexShrink: 0, pointerEvents: 'auto' }} />
      </Box>
    </>
  );
}
