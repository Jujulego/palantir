import MapSpin from '@/components/map/MapSpin';
import AutonomousSystemItem from '@/components/server/AutonomousSystemItem';
import PayloadItem from '@/components/server/PayloadItem';
import ServerMarker from '@/components/server/ServerMarker';
import LocationItem from '@/components/utils/LocationItem';
import { extractAddress, extractAutonomousSystem, extractCoordinates, } from '@/lib/server/ip-info/extractors';
import { queryIpInfo } from '@/lib/server/ip-info/ip-info';
import List from '@mui/material/List';
import { type IPv4, type IPv6 } from 'ipaddr.js';

export interface IpInfoMetadataListProps {
  readonly ip: IPv4 | IPv6;
}

export default async function IpInfoMetadataList({ ip }: IpInfoMetadataListProps) {
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

  // Extract and present metadata
  const autonomousSystem = extractAutonomousSystem(data);
  const coordinates = extractCoordinates(data);

  return (
    <List>
      <LocationItem address={extractAddress(data)} coordinates={coordinates} />
      { autonomousSystem && <AutonomousSystemItem autonomousSystem={autonomousSystem} /> }

      <PayloadItem payload={data} />

      <ServerMarker
        coordinates={coordinates}
        markerKey="ip-info"
        tooltip="IPinfo"
        sx={{ color: 'ipInfo.main' }}
      />
    </List>
  );
}
