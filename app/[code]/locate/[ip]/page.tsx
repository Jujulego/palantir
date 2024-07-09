import Box from '@mui/material/Box';
import { FlagValues } from '@vercel/flags/react';
import ipaddr from 'ipaddr.js';
import { notFound } from 'next/navigation';

import BigDataCloudCard from '@/src/big-data-cloud/BigDataCloudCard';
import {
  precomputeFlags,
  showBigDataCloud,
  showIpData,
  showIpGeolocation,
  showIpInfo,
  showIpQuality
} from '@/src/flags';
import IpDataCard from '@/src/ip-data/IpDataCard';
import IpGeolocationCard from '@/src/ip-geolocation/IpGeolocationCard';
import IpInfoCard from '@/src/ip-info/IpInfoCard';
import IpQualityCard from '@/src/ip-quality/IpQualityCard';

// Page
export interface LocateIpPageProps {
  readonly params: {
    readonly code: string;
    readonly ip: string;
  }
}

export default async function LocateIpPage({ params }: LocateIpPageProps) {
  const ip = decodeURIComponent(params.ip);

  if (!ipaddr.isValid(ip)) {
    notFound();
  }

  const flags = {
    showBigDataCloud: await showBigDataCloud(params.code, precomputeFlags),
    showIpData: await showIpData(params.code, precomputeFlags),
    showIpGeolocation: await showIpGeolocation(params.code, precomputeFlags),
    showIpInfo: await showIpInfo(params.code, precomputeFlags),
    showIpQuality: await showIpQuality(params.code, precomputeFlags),
  };

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
        { flags.showBigDataCloud && <BigDataCloudCard ip={ip} sx={{ flexShrink: 0, pointerEvents: 'auto' }} /> }
        { flags.showIpData && <IpDataCard ip={ip} sx={{ flexShrink: 0, pointerEvents: 'auto' }} /> }
        { flags.showIpGeolocation && <IpGeolocationCard ip={ip} sx={{ flexShrink: 0, pointerEvents: 'auto' }} /> }
        { flags.showIpInfo && <IpInfoCard ip={ip} sx={{ flexShrink: 0, pointerEvents: 'auto' }} /> }
        { flags.showIpQuality && <IpQualityCard ip={ip} sx={{ flexShrink: 0, pointerEvents: 'auto' }} /> }
      </Box>

      <FlagValues values={flags} />
    </>
  );
}
