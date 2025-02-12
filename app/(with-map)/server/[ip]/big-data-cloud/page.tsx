import { decodeIp, type WithMapServerIpParams } from '@/app/(with-map)/server/[ip]/params';
import AutonomousSystemListItem from '@/components/AutonomousSystemListItem';
import LocationListItem from '@/components/LocationListItem';
import MapFlyTo from '@/components/map/MapFlyTo';
import MapMarker from '@/components/map/MapMarker';
import MapSpin from '@/components/map/MapSpin';
import PayloadListItem from '@/components/PayloadListItem';
import { TagsListItem } from '@/components/TagsListItem';
import { extractAddress, extractAutonomousSystem, extractCoordinates, extractTags } from '@/lib/server/big-data-cloud/extractors';
import { queryIpGeolocationFull } from '@/lib/server/big-data-cloud/ip-geolocation';
import List from '@mui/material/List';
import ipaddr from 'ipaddr.js';

// Page
export interface WMServerIpBDCPageProps {
  readonly params: Promise<WithMapServerIpParams>;
}

export default async function WMServerIpBDCPage({ params }: WMServerIpBDCPageProps) {
  // Load data
  const ip = ipaddr.parse(await decodeIp(params));
  const data = await queryIpGeolocationFull(ip);

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
  const address = extractAddress(data);
  const autonomousSystem = extractAutonomousSystem(data);
  const coordinates = extractCoordinates(data);
  const tags = extractTags(data);

  return (
    <List>
      <LocationListItem address={address} coordinates={coordinates} />
      { autonomousSystem && <AutonomousSystemListItem autonomousSystem={autonomousSystem} /> }
      { tags.length > 0 && <TagsListItem tags={tags} /> }

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
