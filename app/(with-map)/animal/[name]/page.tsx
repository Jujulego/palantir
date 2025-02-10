import type { WithMapAnimalNameParams } from '@/app/(with-map)/animal/[name]/params';
import LocationListItem from '@/components/LocationListItem';
import MapFlyTo from '@/components/map/MapFlyTo';
import MapMarker from '@/components/map/MapMarker';
import MapPolyline from '@/components/map/MapPolyline';
import MapSpin from '@/components/map/MapSpin';
import { fetchAnimalTracking } from '@/data/club-ocean';
import PetsIcon from '@mui/icons-material/Pets';
import StraightenIcon from '@mui/icons-material/Straighten';
import WcIcon from '@mui/icons-material/Wc';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { redirect } from 'next/navigation';

// Page
export interface WithMapAnimalPageProps {
  readonly params: Promise<WithMapAnimalNameParams>;
}

export default async function WithMapAnimalPage({ params }: WithMapAnimalPageProps) {
  const name = decodeURIComponent((await params).name);
  const animal = await fetchAnimalTracking(name);

  if (!animal) {
    return redirect('/');
  }

  // Render
  const position = animal.coordinates[animal.coordinates.length - 1];

  return (
    <List>
      <LocationListItem coordinates={position} />
      { animal.species && (
        <ListItem sx={{ minHeight: 56, px: 2, py: 0 }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <PetsIcon color="primary" />
          </ListItemIcon>

          <ListItemText primary={animal.species} />
        </ListItem>
      ) }
      { animal.size && (
        <ListItem sx={{ minHeight: 56, px: 2, py: 0 }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <StraightenIcon color="primary" />
          </ListItemIcon>

          <ListItemText primary={animal.size} />
        </ListItem>
      ) }
      { animal.gender && (
        <ListItem sx={{ minHeight: 56, px: 2, py: 0 }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <WcIcon color="primary" />
          </ListItemIcon>

          <ListItemText primary={animal.gender} />
        </ListItem>
      ) }

      <MapPolyline coordinates={animal.coordinates} />

      { position && <MapMarker latitude={position.latitude} longitude={position.longitude} selected /> }
      { position
        ? <MapFlyTo latitude={position.latitude} longitude={position.longitude} zoom={5} />
        : <MapSpin /> }
    </List>
  );
}
