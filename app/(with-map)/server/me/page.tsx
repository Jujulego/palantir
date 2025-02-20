import HostnameLink from '@/components/dns/HostnameLink';
import MapFlyTo from '@/components/map/MapFlyTo';
import MapMarker from '@/components/map/MapMarker';
import MapSpin from '@/components/map/MapSpin';
import MetadataSourceMenu from '@/components/server/MetadataSourceMenu';
import ServerMarkerIcon from '@/components/server/ServerMarkerIcon';
import LocationItem from '@/components/utils/LocationItem';
import { reverseDnsLookup } from '@/lib/dns/reverse-dns-lookup';
import { vercelIpAddress, vercelIpCoordinates } from '@/lib/server/vercel/extractors';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import ipaddr from 'ipaddr.js';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

// Page
export default async function WithMapServerMePage() {
  const forwardedFor = (await headers()).get('x-forwarded-for');

  if (forwardedFor === null || !ipaddr.isValid(forwardedFor)) {
    redirect('/');
  }

  // Load data
  const ip = ipaddr.parse(forwardedFor);
  const coordinates = await vercelIpCoordinates();

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Box sx={{ display: 'flex', pl: 2.5, pr: 1, pt: 2 }}>
          <Typography component="h1" variant="h5" noWrap sx={{ flex: 1 }}>
            { ip.toString() }
          </Typography>

          <IconButton
            component={Link}
            href="/"
            sx={{ flex: '0 0 auto', mt: -1 }}
            aria-label="Close panel"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', pl: 2.5, pr: 1.5, pb: 2, alignItems: 'center' }}>
          <Suspense fallback={<Skeleton height={20} width="75%" />}>
            <HostnameLink hostname={reverseDnsLookup(forwardedFor)} sx={{ flex: 1 }} />
          </Suspense>

          <MetadataSourceMenu ip={forwardedFor} sx={{ flex: '0 0 auto', ml: 'auto' }} />
        </Box>
      </Box>

      <Divider />

      <List>
        <LocationItem address={await vercelIpAddress()} coordinates={coordinates} />

        { coordinates
          ? (
            <>
              <MapMarker latitude={coordinates.latitude} longitude={coordinates.longitude}>
                <ServerMarkerIcon markerKey="vercel" tooltip="Vercel" sx={{ color: 'primary.main' }} />
              </MapMarker>
              <MapFlyTo latitude={coordinates.latitude} longitude={coordinates.longitude} zoom={5} />
            </>
          )
          : <MapSpin /> }
      </List>
    </>
  );
}
