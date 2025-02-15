import { decodeIp, type WithMapServerIpParams } from '@/app/(with-map)/server/[ip]/params';
import AutonomousSystemItem from '@/components/server/AutonomousSystemItem';
import LocationItem from '@/components/utils/LocationItem';
import MapFlyTo from '@/components/map/MapFlyTo';
import MapMarker from '@/components/map/MapMarker';
import MapSpin from '@/components/map/MapSpin';
import PayloadItem from '@/components/server/PayloadItem';
import TagsItem from '@/components/utils/TagsItem';
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
        <LocationItem />
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
      <LocationItem address={extractAddress(data)} coordinates={coordinates} />
      { autonomousSystem && <AutonomousSystemItem autonomousSystem={autonomousSystem} /> }
      { tags.length > 0 && <TagsItem tags={tags} /> }

      <PayloadItem payload={data} />

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
