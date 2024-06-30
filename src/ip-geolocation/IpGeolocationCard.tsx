import { Avatar, Card, CardHeader, Chip, Divider, List } from '@mui/material';
import { blue } from '@mui/material/colors';

import DataItem from '@/src/common/DataItem';
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
        <DataItem name="ISP">{ result.isp }</DataItem>
        <DataItem name="Organisation">{ result.organization }</DataItem>
      </List>

      <Divider />

      <List dense>
        <DataItem name="Adresse">{ result.zipcode } { result.city }</DataItem>
        <DataItem name="Région">
          { result.state_prov } <RefSpan>({ result.state_code })</RefSpan>
        </DataItem>
        <DataItem name="Pays">
          { result.country_emoji } { result.country_name } <RefSpan>({ result.country_code2 })</RefSpan>
        </DataItem>
        <DataItem name="Continent">
          { result.continent_name } <RefSpan>({ result.continent_code })</RefSpan>
        </DataItem>
      </List>
    </Card>
  );
}

