import LocationTypography from '@/components/LocationTypography';
import MapboxFlyTo from '@/components/mapbox/MapboxFlyTo';
import MapboxMarker from '@/components/mapbox/MapboxMarker';
import MapboxSpin from '@/components/mapbox/MapboxSpin';
import { ipSources, isIpSourceIdParam } from '@/data/sources';
import HubIcon from '@mui/icons-material/Hub';
import LabelIcon from '@mui/icons-material/Label';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { notFound } from 'next/navigation';

// Page
export interface WithMapIpSourcePageProps {
  readonly params: Promise<{
    readonly ip: string;
    readonly source: string;
  }>;
}

export default async function WithMapIpPage({ params }: WithMapIpSourcePageProps) {
  const ip = decodeURIComponent((await params).ip);
  const source = decodeURIComponent((await params).source);

  if (!isIpSourceIdParam(source)) {
    notFound();
  }

  const { address, asn, coordinates, tags } = await ipSources[source].fetch(ip);

  // Render
  return <List>
    <ListItem sx={{ minHeight: 56, px: 2, py: 0 }}>
      <ListItemIcon sx={{ minWidth: 40 }}>
        <LocationCityIcon color="primary" />
      </ListItemIcon>

      <ListItemText
        primary={<LocationTypography address={address} coordinates={coordinates} />}
        secondary={address?.country}
      />
    </ListItem>

    { asn && (
      <ListItem sx={{ minHeight: 56, px: 2, py: 0 }}>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <HubIcon color="primary" />
        </ListItemIcon>

        <ListItemText
          primary={asn.organisation} primaryTypographyProps={{ noWrap: true }}
          secondary={`AS${asn.asn}`}
        />
      </ListItem>
    ) }

    { tags.length > 0 && (
      <ListItem disablePadding sx={{ minHeight: 56, px: 2 }}>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <LabelIcon color="primary" />
        </ListItemIcon>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          { tags.map((tag) => (
            <Chip key={tag.label} label={tag.label} size="small" color={tag.color} />
          )) }
        </Box>
      </ListItem>
    ) }

    { coordinates ? (<>
      <MapboxMarker
        latitude={coordinates.latitude}
        longitude={coordinates.longitude}
      />
      <MapboxFlyTo latitude={coordinates.latitude} longitude={coordinates.longitude} zoom={5} />
    </>) : (
      <MapboxSpin />
    ) }
  </List>
}
