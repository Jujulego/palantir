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
} from '@/lib/server/ip-data/extractors';
import { queryIpData } from '@/lib/server/ip-data/ip-data';
import List from '@mui/material/List';
import ipaddr from 'ipaddr.js';

// Page
export interface WMServerIpDataPageProps {
  readonly params: Promise<WithMapServerIpParams>;
}

export default async function WMServerIpDataPage({ params }: WMServerIpDataPageProps) {
  // Load data
  const ip = ipaddr.parse(await decodeIp(params));
  const data = await queryIpData(ip);

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

      { coordinates ? (
        <>
          <MapMarker
            latitude={coordinates.latitude}
            longitude={coordinates.longitude}
            tooltip="ipdata"
            selected
            sx={{ color: 'ipdata.main' }}
          />
          <MapFlyTo latitude={coordinates.latitude} longitude={coordinates.longitude} zoom={5} />
        </>
      ) : (
        <MapSpin />
      ) }
    </List>
  );
}