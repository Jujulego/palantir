import { decodeIp, type WithMapServerIpParams } from '@/app/(with-map)/server/[ip]/params';
import AutonomousSystemListItem from '@/components/AutonomousSystemListItem';
import IpMapMarkers from '@/components/IpMapMarkers';
import LocationListItem from '@/components/LocationListItem';
import MapFlyTo from '@/components/map/MapFlyTo';
import MapSpin from '@/components/map/MapSpin';
import PayloadListItem from '@/components/PayloadListItem';
import { ipSources, parseSourceIdParam } from '@/data/sources';
import LabelIcon from '@mui/icons-material/Label';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';

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

      { tags.length > 0 && (
        <ListItem disablePadding sx={{ minHeight: 56, px: 2 }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <LabelIcon color="primary" />
          </ListItemIcon>

          <Box component="ul" sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', p: 0, gap: 1 }}>
            { tags.map((tag) => (
              <Chip key={tag.label} component="li" label={tag.label} size="small" color={tag.color} />
            )) }
          </Box>
        </ListItem>
      ) }

      <PayloadListItem payload={raw} />

      <IpMapMarkers sourceId={source} coordinates={coordinates} />

      { coordinates
        ? <MapFlyTo latitude={coordinates.latitude} longitude={coordinates.longitude} zoom={5} />
        : <MapSpin /> }
    </List>
  );
}
