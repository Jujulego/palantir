import { decodeIp, type WithMapServerIpParams } from '@/app/(with-map)/server/[ip]/params';
import AutonomousSystemListItem from '@/components/AutonomousSystemListItem';
import LocationListItem from '@/components/LocationListItem';
import MapFlyTo from '@/components/map/MapFlyTo';
import MapMarker from '@/components/map/MapMarker';
import MapSpin from '@/components/map/MapSpin';
import PayloadListItem from '@/components/PayloadListItem';
import { TagsListItem } from '@/components/TagsListItem';
import {
  extractAddress,
  extractAutonomousSystem,
  extractCoordinates,
  extractTags
} from '@/lib/server/ip-geolocation/extractors';
import { queryIpGeolocation } from '@/lib/server/ip-geolocation/ip-geolocation';
import List from '@mui/material/List';
import ipaddr from 'ipaddr.js';

// Page
export interface WMServerIpGeolocationPageProps {
  readonly params: Promise<WithMapServerIpParams>;
}

export default async function WMServerIpGeolocationPage({ params }: WMServerIpGeolocationPageProps) {
  // Load data
  const ip = ipaddr.parse(await decodeIp(params));
  const data = await queryIpGeolocation(ip);

  // No result
  if (!data) {
    return (
      <List>
        <LocationListItem />
        <MapSpin />
      </List>
    );
  }

  // Render
  const autonomousSystem = extractAutonomousSystem(data);
  const coordinates = extractCoordinates(data);
  const tags = extractTags(data);

  return (
    <List>
      <LocationListItem address={extractAddress(data)} coordinates={coordinates} />
      { autonomousSystem && <AutonomousSystemListItem autonomousSystem={autonomousSystem} /> }
      { tags.length > 0 && <TagsListItem tags={tags} /> }

      <PayloadListItem payload={data} />

      <MapMarker
        latitude={coordinates.latitude}
        longitude={coordinates.longitude}
        tooltip="ipgeolocation"
        selected
        sx={{ color: 'ipGeolocation.main' }}
      />
      <MapFlyTo latitude={coordinates.latitude} longitude={coordinates.longitude} zoom={5} />
    </List>
  );
}
