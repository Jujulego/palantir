import ipaddr from 'ipaddr.js';
import { notFound } from 'next/navigation';
import { MapboxGate } from '@/src/mapbox/MapboxGate';
import Box from '@mui/material/Box';

import BigDataCloudArea from '@/src/big-data-cloud/BigDataCloudArea';
import BigDataCloudCard from '@/src/big-data-cloud/BigDataCloudCard';
import BigDataCloudMarker from '@/src/big-data-cloud/BigDataCloudMarker';
import IpDataCard from '@/src/ip-data/IpDataCard';
import IpDataMarker from '@/src/ip-data/IpDataMarker';
import IpGeolocationCard from '@/src/ip-geolocation/IpGeolocationCard';
import IpGeolocationMarker from '@/src/ip-geolocation/IpGeolocationMarker';
import IpInfoCard from '@/src/ip-info/IpInfoCard';
import IpInfoMarker from '@/src/ip-info/IpInfoMarker';
import IpQualityCard from '@/src/ip-quality/IpQualityCard';
import IpQualityMarker from '@/src/ip-quality/IpQualityMarker';

// Page
export interface LocateIpPageProps {
  readonly params: {
    readonly ip: string;
  }
}

export default function LocateIpPage({ params }: LocateIpPageProps) {
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
        <IpGeolocationCard ip={ip} sx={{ flexShrink: 0, pointerEvents: 'auto' }} />
        <BigDataCloudCard ip={ip} sx={{ flexShrink: 0, pointerEvents: 'auto' }} />
        <IpDataCard ip={ip} sx={{ flexShrink: 0, pointerEvents: 'auto' }} />
        <IpQualityCard ip={ip} sx={{ flexShrink: 0, pointerEvents: 'auto' }} />
        <IpInfoCard ip={ip} sx={{ flexShrink: 0, pointerEvents: 'auto' }} />
      </Box>

      <MapboxGate>
        <BigDataCloudArea ip={ip} />
        <BigDataCloudMarker ip={ip} />
        <IpDataMarker ip={ip} />
        <IpGeolocationMarker ip={ip} />
        <IpQualityMarker ip={ip} />
        <IpInfoMarker ip={ip} />
      </MapboxGate>
    </>
  );
}

export function generateStaticParams() {
  return [
    { ip: '127.0.0.1' },
    { ip: '::ffff:127.0.0.1' },
    { ip: '::1' },
  ];
}
