import { decodeIp, type WithMapServerIpParams } from '@/app/(with-map)/server/[ip]/params';
import MapFlyTo from '@/components/map/MapFlyTo';
import MapSpin from '@/components/map/MapSpin';
import AutonomousSystemItem from '@/components/server/AutonomousSystemItem';
import PayloadItem from '@/components/server/PayloadItem';
import ServerMarker from '@/components/server/ServerMarker';
import LocationItem from '@/components/utils/LocationItem';
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
  if (!data || data.bogon) {
    return (
      <List>
        <LocationItem />
        { data?.bogon && <PayloadItem payload={data} /> }

        <MapSpin />
      </List>
    );
  }

  // Render
  const autonomousSystem = extractAutonomousSystem(data);
  const coordinates = extractCoordinates(data);

  return (
    <List>
      <LocationItem address={extractAddress(data)} coordinates={coordinates} />
      { autonomousSystem && <AutonomousSystemItem autonomousSystem={autonomousSystem} /> }

      <PayloadItem payload={data} />

      { coordinates ? (
        <ServerMarker
          coordinates={coordinates}
          tooltip="IPinfo"
          selected
          sx={{ color: 'ipInfo.main' }}
        />
      ) : <MapSpin /> }
    </List>
  );
}
