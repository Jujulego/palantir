import { decodeIp, type WithMapServerIpParams } from '@/app/(with-map)/server/[ip]/params';
import LocationListItem from '@/components/LocationListItem';
import { queryIpGeolocationFull } from '@/lib/server/big-data-cloud/ip-geolocation';
import { extractAddress, extractLocation } from '@/lib/server/big-data-cloud/extractors';
import List from '@mui/material/List';
import ipaddr from 'ipaddr.js';

export interface WMServerIpBDCProps {
  readonly params: Promise<WithMapServerIpParams>;
}

export default async function WMServerIpBDCPage({ params }: WMServerIpBDCProps) {
  // Load data
  const ip = ipaddr.parse(await decodeIp(params));
  const data = await queryIpGeolocationFull(ip);

  // Render
  return (
    <List>
      <LocationListItem
        address={extractAddress(data)}
        location={extractLocation(data)}
      />
    </List>
  );
}