import {
  Avatar,
  Card,
  CardHeader, Chip,
  Divider,
  List,
  ListItem, ListItemButton, ListItemText,
  Typography
} from '@mui/material';
import { blue } from '@mui/material/colors';

import { RefSpan } from '@/src/common/utils';
import { searchIpGeolocation } from '@/src/ip-geolocation/data';
import MapboxFocusButton from '@/src/mapbox/MapboxFocusButton';

// Component
export interface IpGeolocationCardProps {
  readonly ip: string;
}

export default async function IpGeolocationCard({ ip }: IpGeolocationCardProps) {
  const result = await searchIpGeolocation(ip);

  return (
    <Card>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: blue[300] }}>GL</Avatar>}
        disableTypography
        title={
          <Typography component="h4" variant="body2">
            IP Geolocation
            { result.connection_type && (
              <Chip label={result.connection_type} size="small" sx={{ ml: 1, my: -0.25 }} />
            ) }
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="text.secondary">{ result.ip }</Typography>
        }
        action={
          <MapboxFocusButton focusKey="ip-geolocation" />
        }
      />

      <Divider />

      <List dense>
        <ListItem>
          <Typography variant="subtitle2" sx={{ width: 108 }}>ISP</Typography>
          <ListItemText>{ result.isp }</ListItemText>
        </ListItem>
        <ListItem>
          <Typography variant="subtitle2" sx={{ width: 108 }}>Organisation</Typography>
          <ListItemText>{ result.organization }</ListItemText>
        </ListItem>
      </List>

      <Divider />

      <List dense>
        <ListItemButton>
          <Typography variant="subtitle2" sx={{ width: 108 }}>Adresse</Typography>
          <ListItemText>{ result.zipcode } { result.city }</ListItemText>
        </ListItemButton>
        <ListItem>
          <Typography variant="subtitle2" sx={{ width: 108 }}>Région</Typography>
          <ListItemText>
            { result.state_prov } <RefSpan>({ result.state_code })</RefSpan>
          </ListItemText>
        </ListItem>
        <ListItem>
          <Typography variant="subtitle2" sx={{ width: 108 }}>Pays</Typography>
          <ListItemText>
            { result.country_emoji } { result.country_name } <RefSpan>({ result.country_code2 })</RefSpan>
          </ListItemText>
        </ListItem>
        <ListItem>
          <Typography variant="subtitle2" sx={{ width: 108 }}>Continent</Typography>
          <ListItemText>
            { result.continent_name } <RefSpan>({ result.continent_code })</RefSpan>
          </ListItemText>
        </ListItem>
      </List>
    </Card>
  );
}

