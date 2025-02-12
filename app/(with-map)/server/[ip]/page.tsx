import { decodeIp, type WithMapServerIpParams } from '@/app/(with-map)/server/[ip]/params';
import AutonomousSystemListItem from '@/components/AutonomousSystemListItem';
import IpMapMarkers from '@/components/IpMapMarkers';
import LocationListItem from '@/components/LocationListItem';
import MapFlyTo from '@/components/map/MapFlyTo';
import MapSpin from '@/components/map/MapSpin';
import PayloadListItem from '@/components/PayloadListItem';
import { TagsListItem } from '@/components/TagsListItem';
import { ipSources, parseSourceIdParam } from '@/data/sources';
import List from '@mui/material/List';

// Page
export interface WithMapServerIpPageProps {
  readonly params: Promise<WithMapServerIpParams>;
  readonly searchParams: Promise<{
    readonly source?: string | string[];
  }>
}

export default async function WithMapServerIpPage({ params, searchParams }: WithMapServerIpPageProps) {
  const ip = await decodeIp(params);
  const source = parseSourceIdParam((await searchParams).source)[0];

  const { address, asn, coordinates, tags, raw } = await ipSources[source].fetch(ip);

  // Render
  return (
    <List>
      <LocationListItem address={address} coordinates={coordinates} />

      { asn && <AutonomousSystemListItem autonomousSystem={asn} /> }
      { tags.length > 0 && <TagsListItem tags={tags} /> }

      <PayloadListItem payload={raw} />

      <IpMapMarkers sourceId={source} coordinates={coordinates} />

      { coordinates
        ? <MapFlyTo latitude={coordinates.latitude} longitude={coordinates.longitude} zoom={5} />
        : <MapSpin /> }
    </List>
  );
}
