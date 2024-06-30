import {
  Avatar,
  Card,
  CardHeader, Chip,
  Divider,
  List,
  ListItem, ListItemButton, ListItemText, Tooltip,
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
        title={
          <>
            IP Geolocation
            { result.connection_type && (
              <Chip label={result.connection_type} size="small" sx={{ ml: 1, my: -0.25 }} />
            ) }
          </>
        }
        subheader={ip}
        action={
          <MapboxFocusButton focusKey="ip-geolocation" />
        }
      />

      <Divider />

      <List dense>
        <ListItem>
          <Typography variant="subtitle2" sx={{ width: 108, flex: '0 0 auto' }}>ISP</Typography>
          <Tooltip title={result.isp}>
            <ListItemText primaryTypographyProps={{ noWrap: true }}>{ result.isp }</ListItemText>
          </Tooltip>
        </ListItem>
        <ListItem>
          <Typography variant="subtitle2" sx={{ width: 108, flex: '0 0 auto' }}>Organisation</Typography>
          <Tooltip title={result.organization}>
            <ListItemText primaryTypographyProps={{ noWrap: true }}>{ result.organization }</ListItemText>
          </Tooltip>
        </ListItem>
      </List>

      <Divider />

      <List dense>
        <ListItemButton>
          <Typography variant="subtitle2" sx={{ width: 108, flex: '0 0 auto' }}>Adresse</Typography>
          <ListItemText>{ result.zipcode } { result.city }</ListItemText>
        </ListItemButton>
        <ListItem>
          <Typography variant="subtitle2" sx={{ width: 108, flex: '0 0 auto' }}>Région</Typography>
          <ListItemText>
            { result.state_prov } <RefSpan>({ result.state_code })</RefSpan>
          </ListItemText>
        </ListItem>
        <ListItem>
          <Typography variant="subtitle2" sx={{ width: 108, flex: '0 0 auto' }}>Pays</Typography>
          <ListItemText>
            { result.country_emoji } { result.country_name } <RefSpan>({ result.country_code2 })</RefSpan>
          </ListItemText>
        </ListItem>
        <ListItem>
          <Typography variant="subtitle2" sx={{ width: 108, flex: '0 0 auto' }}>Continent</Typography>
          <ListItemText>
            { result.continent_name } <RefSpan>({ result.continent_code })</RefSpan>
          </ListItemText>
        </ListItem>
      </List>
    </Card>
  );
}

