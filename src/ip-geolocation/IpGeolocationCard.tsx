import { Avatar, Card, CardHeader, Divider, List } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Suspense } from 'react';

import DataItem from '@/src/common/DataItem';
import IpGeolocationAddress from '@/src/ip-geolocation/IpGeolocationAddress';
import IpGeolocationConnectionType from '@/src/ip-geolocation/IpGeolocationConnectionType';
import IpGeolocationContinent from '@/src/ip-geolocation/IpGeolocationContinent';
import IpGeolocationCountry from '@/src/ip-geolocation/IpGeolocationCountry';
import IpGeolocationISP from '@/src/ip-geolocation/IpGeolocationISP';
import IpGeolocationOrganization from '@/src/ip-geolocation/IpGeolocationOrganization';
import IpGeolocationState from '@/src/ip-geolocation/IpGeolocationState';
import MapboxFocusButton from '@/src/mapbox/MapboxFocusButton';

// Component
export interface IpGeolocationCardProps {
  readonly ip: string;
}

export default function IpGeolocationCard({ ip }: IpGeolocationCardProps) {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: blue[300] }}>GL</Avatar>}
        title={
          <>
            IP Geolocation
            <Suspense>
              <IpGeolocationConnectionType ip={ip} sx={{ ml: 1, my: -0.25 }} />
            </Suspense>
          </>
        }
        subheader={ip}
        action={
          <MapboxFocusButton focusKey="ip-geolocation" />
        }
      />

      <Divider />

      <List dense>
        <DataItem name="ISP"><IpGeolocationISP ip={ip} /></DataItem>
        <DataItem name="Organisation"><IpGeolocationOrganization ip={ip} /></DataItem>
      </List>

      <Divider />

      <List dense>
        <DataItem name="Adresse"><IpGeolocationAddress ip={ip} /></DataItem>
        <DataItem name="Région"><IpGeolocationState ip={ip} /></DataItem>
        <DataItem name="Pays"><IpGeolocationCountry ip={ip} /></DataItem>
        <DataItem name="Continent"><IpGeolocationContinent ip={ip} /></DataItem>
      </List>
    </Card>
  );
}

