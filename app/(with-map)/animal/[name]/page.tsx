import { fetchAnimalTracking } from '@/data/club-ocean';
import PetsIcon from '@mui/icons-material/Pets';
import StraightenIcon from '@mui/icons-material/Straighten';
import WcIcon from '@mui/icons-material/Wc';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Page
export interface WithMapAnimalPageProps {
  readonly params: Promise<{
    readonly name: string;
  }>;
}

export default async function WithMapAnimalPage({ params }: WithMapAnimalPageProps) {
  const name = decodeURIComponent((await params).name);
  const { gender, size, species } = await fetchAnimalTracking(name);

  // Render
  return <List>
    { species && (
      <ListItem sx={{ minHeight: 56, px: 2, py: 0 }}>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <PetsIcon color="primary" />
        </ListItemIcon>

        <ListItemText primary={species} />
      </ListItem>
    ) }
    { size && (
      <ListItem sx={{ minHeight: 56, px: 2, py: 0 }}>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <StraightenIcon color="primary" />
        </ListItemIcon>

        <ListItemText primary={size} />
      </ListItem>
    ) }
    { gender && (
      <ListItem sx={{ minHeight: 56, px: 2, py: 0 }}>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <WcIcon color="primary" />
        </ListItemIcon>

        <ListItemText primary={gender} />
      </ListItem>
    ) }
  </List>;
}
