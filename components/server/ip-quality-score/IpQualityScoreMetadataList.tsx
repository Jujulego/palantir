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
  extractTags,
} from '@/lib/server/ip-quality-score/extractors';
import { queryIpQualityScore } from '@/lib/server/ip-quality-score/ip-quality-score';
import List from '@mui/material/List';
import { type IPv4, type IPv6 } from 'ipaddr.js';

export interface IpInfoMetadataListProps {
  readonly ip: IPv4 | IPv6;
}

export default async function IpQualityScoreMetadataList({ ip }: IpInfoMetadataListProps) {
  const data = await queryIpQualityScore(ip);

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
  const address = extractAddress(data);
  const autonomousSystem = extractAutonomousSystem(data);
  const coordinates = extractCoordinates(data);
  const tags = extractTags(data);

  return (
    <List>
      <LocationItem address={address} coordinates={coordinates} />
      { autonomousSystem && <AutonomousSystemItem autonomousSystem={autonomousSystem} /> }
      { tags.length > 0 && <TagsItem tags={tags} /> }

      <PayloadItem payload={data} />

      { coordinates ? (
        <ServerMarker
          coordinates={coordinates}
          markerKey="ip-quality-score"
          tooltip="IPQS"
          sx={{ color: 'ipQualityScore.main' }}
        />
      ) : <MapSpin /> }
    </List>
  );
}
