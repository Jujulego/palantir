import { decodeIp, type WithMapServerIpParams } from '@/app/(with-map)/server/[ip]/params';
import AutonomousSystemItem from '@/components/server/AutonomousSystemItem';
import LocationItem from '@/components/utils/LocationItem';
import MapFlyTo from '@/components/map/MapFlyTo';
import MapMarker from '@/components/map/MapMarker';
import MapSpin from '@/components/map/MapSpin';
import PayloadItem from '@/components/server/PayloadItem';
import TagsItem from '@/components/utils/TagsItem';
import { extractAddress, extractAutonomousSystem, extractCoordinates, extractTags } from '@/lib/server/ip-quality-score/extractors';
import { queryIpQualityScore } from '@/lib/server/ip-quality-score/ip-quality-score';
import List from '@mui/material/List';
import ipaddr from 'ipaddr.js';

// Page
export interface WMServerIpIPQSPageProps {
  readonly params: Promise<WithMapServerIpParams>;
}

export default async function WMServerIpIPQSPage({ params }: WMServerIpIPQSPageProps) {
  // Load data
  const ip = ipaddr.parse(await decodeIp(params));
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
        <>
          <MapMarker
            latitude={coordinates.latitude}
            longitude={coordinates.longitude}
            tooltip="IPQS"
            selected
            sx={{ color: 'ipQualityScore.main' }}
          />
          <MapFlyTo latitude={coordinates.latitude} longitude={coordinates.longitude} zoom={5} />
        </>
      ) : (
        <MapSpin />
      ) }
    </List>
  );
}
