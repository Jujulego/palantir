import { decodeIp, type WithMapServerIpParams } from '@/app/(with-map)/server/[ip]/params';
import AutonomousSystemListItem from '@/components/AutonomousSystemListItem';
import LocationListItem from '@/components/LocationListItem';
import MapFlyTo from '@/components/map/MapFlyTo';
import MapMarker from '@/components/map/MapMarker';
import MapSpin from '@/components/map/MapSpin';
import PayloadListItem from '@/components/PayloadListItem';
import { extractAddress, extractAutonomousSystem, extractCoordinates } from '@/lib/server/ip-info/extractors';
import { queryIpInfo } from '@/lib/server/ip-info/ip-info';
import List from '@mui/material/List';
import ipaddr from 'ipaddr.js';

// Page
export interface WMServerIpInfoPageProps {
  readonly params: Promise<WithMapServerIpParams>;
}

export default async function WMServerIpInfoPage({ params }: WMServerIpInfoPageProps) {
  // Load data
  const ip = ipaddr.parse(await decodeIp(params));
  const data = await queryIpInfo(ip);

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

  return (
    <List>
      <LocationListItem address={extractAddress(data)} coordinates={coordinates} />
      { autonomousSystem && <AutonomousSystemListItem autonomousSystem={autonomousSystem} /> }

      <PayloadListItem payload={data} />

      <MapMarker
        latitude={coordinates.latitude}
        longitude={coordinates.longitude}
        tooltip="IpInfo"
        selected
        sx={{ color: 'ipInfo.main' }}
      />
      <MapFlyTo latitude={coordinates.latitude} longitude={coordinates.longitude} zoom={5} />
    </List>
  );
}