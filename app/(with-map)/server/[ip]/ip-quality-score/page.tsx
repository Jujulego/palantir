import { decodeIp, type WithMapServerIpParams } from '@/app/(with-map)/server/[ip]/params';
import MapSpin from '@/components/map/MapSpin';
import AutonomousSystemItem from '@/components/server/AutonomousSystemItem';
import PayloadItem from '@/components/server/PayloadItem';
import ServerMarker from '@/components/server/ServerMarker';
import LocationItem from '@/components/utils/LocationItem';
import TagsItem from '@/components/utils/TagsItem';
import { isAuthenticated } from '@/lib/auth/is-authenticated';
import {
  extractAddress,
  extractAutonomousSystem,
  extractCoordinates,
  extractTags
} from '@/lib/server/ip-quality-score/extractors';
import { queryIpQualityScore } from '@/lib/server/ip-quality-score/ip-quality-score';
import List from '@mui/material/List';
import ipaddr from 'ipaddr.js';

// Page
export interface WMServerIpIPQSPageProps {
  readonly params: Promise<WithMapServerIpParams>;
}

export default async function WMServerIpIPQSPage({ params }: WMServerIpIPQSPageProps) {
  const ip = ipaddr.parse(await decodeIp(params));

  await isAuthenticated({ returnTo: `/server/${ip}/ip-quality-score` });

  // Load data
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

  // Render
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
