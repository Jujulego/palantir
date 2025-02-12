import { decodeIp, type WithMapServerIpParams } from '@/app/(with-map)/server/[ip]/params';
import LocationListItem from '@/components/LocationListItem';
import MapMarker from '@/components/map/MapMarker';
import MapSpin from '@/components/map/MapSpin';
import PayloadListItem from '@/components/PayloadListItem';
import { queryIpGeolocationFull } from '@/lib/server/big-data-cloud/ip-geolocation';
import { extractAddress, extractCoordinates } from '@/lib/server/big-data-cloud/extractors';
import List from '@mui/material/List';
import ipaddr from 'ipaddr.js';
import MapFlyTo from '@/components/map/MapFlyTo';

export interface WMServerIpBDCProps {
  readonly params: Promise<WithMapServerIpParams>;
}

export default async function WMServerIpBDCPage({ params }: WMServerIpBDCProps) {
  // Load data
  const ip = ipaddr.parse(await decodeIp(params));
  const data = await queryIpGeolocationFull(ip);

  // Render
  const coordinates = extractCoordinates(data);

  return (
    <List>
      <LocationListItem address={extractAddress(data)} coordinates={coordinates} />

      <PayloadListItem payload={data} />

      { coordinates ? (
        <>
          <MapMarker
            latitude={coordinates.latitude}
            longitude={coordinates.longitude}
            tooltip="Big Data Cloud"
            selected
            sx={{ color: 'bigDataCloud.main' }}
          />
          <MapFlyTo latitude={coordinates.latitude} longitude={coordinates.longitude} zoom={5} />
        </>
      ) : (
        <MapSpin />
      ) }
    </List>
  );
}