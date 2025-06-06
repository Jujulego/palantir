import MapSpin from '@/components/map/MapSpin';
import AutonomousSystemItem from '@/components/server/AutonomousSystemItem';
import PayloadItem from '@/components/server/PayloadItem';
import ServerMarker from '@/components/server/ServerMarker';
import LocationItem from '@/components/utils/LocationItem';
import TagsItem from '@/components/utils/TagsItem';
import {
  extractAddress,
  extractAutonomousSystem,
  extractCoordinates,
  extractTags
} from '@/lib/server/ip-data/extractors';
import { queryIpData } from '@/lib/server/ip-data/ip-data';
import List from '@mui/material/List';
import { type IPv4, type IPv6 } from 'ipaddr.js';

export interface IpDataMetadataListProps {
  readonly ip: IPv4 | IPv6;
}

export default async function IpDataMetadataList({ ip }: IpDataMetadataListProps) {
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

  // Extract and present metadata
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
        <ServerMarker
          coordinates={coordinates}
          markerKey="ip-data"
          tooltip="ipdata"
          sx={{ color: 'ipData.main' }}
        />
      ) : <MapSpin /> }
    </List>
  );
}
