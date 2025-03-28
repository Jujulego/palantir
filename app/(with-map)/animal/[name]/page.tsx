import { decodeName, type WithMapAnimalNameParams } from '@/app/(with-map)/animal/[name]/params';
import AnimalMarker from '@/components/animal/AnimalMarker';
import MapPolyline from '@/components/map/MapPolyline';
import MapSpin from '@/components/map/MapSpin';
import LocationItem from '@/components/utils/LocationItem';
import { scrapAnimalTracking } from '@/lib/animal/club-ocean';
import PetsIcon from '@mui/icons-material/Pets';
import StraightenIcon from '@mui/icons-material/Straighten';
import WcIcon from '@mui/icons-material/Wc';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { redirect, RedirectType } from 'next/navigation';

// Page
export interface WithMapAnimalNamePageProps {
  readonly params: Promise<WithMapAnimalNameParams>;
}

export default async function WithMapAnimalPage({ params }: WithMapAnimalNamePageProps) {
  const name = await decodeName(params);
  const animal = await scrapAnimalTracking(name);

  if (!animal) {
    return redirect('/', RedirectType.replace);
  }

  // Render
  const coordinates = animal.coordinates[animal.coordinates.length - 1];

  return (
    <List>
      <LocationItem coordinates={coordinates} />
      { animal.species && (
        <ListItem sx={{ minHeight: 56, px: 2, py: 0 }}>
          <ListItemIcon>
            <PetsIcon color="primary" />
          </ListItemIcon>

          <ListItemText primary={animal.species} />
        </ListItem>
      ) }
      { animal.size && (
        <ListItem sx={{ minHeight: 56, px: 2, py: 0 }}>
          <ListItemIcon>
            <StraightenIcon color="primary" />
          </ListItemIcon>

          <ListItemText primary={animal.size} />
        </ListItem>
      ) }
      { animal.gender && (
        <ListItem sx={{ minHeight: 56, px: 2, py: 0 }}>
          <ListItemIcon>
            <WcIcon color="primary" />
          </ListItemIcon>

          <ListItemText primary={animal.gender} />
        </ListItem>
      ) }

      <MapPolyline coordinates={animal.coordinates} />

      { coordinates
        ? <AnimalMarker coordinates={coordinates} />
        : <MapSpin /> }
    </List>
  );
}
