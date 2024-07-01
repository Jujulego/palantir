import IpInfoHostname from '@/src/ip-info/IpInfoHostname';
import { Avatar, Card, CardHeader, Divider, List } from '@mui/material';
import { green } from '@mui/material/colors';
import { Suspense } from 'react';

import DataItem from '@/src/common/DataItem';
import IpInfoAddress from '@/src/ip-info/IpInfoAddress';
import IpInfoCountry from '@/src/ip-info/IpInfoCountry';
import IpInfoOrganization from '@/src/ip-info/IpInfoOrganization';
import IpInfoState from '@/src/ip-info/IpInfoState';
import MapboxFocusButton from '@/src/mapbox/MapboxFocusButton';

// Component
export interface IpInfoCardProps {
  readonly ip: string;
}

export default function IpInfoCard({ ip }: IpInfoCardProps) {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: green[300] }}>IN</Avatar>}
        title="IP Info"
        subheader={
          <Suspense fallback={ip}>
            <IpInfoHostname ip={ip} />
          </Suspense>
        }
        action={
          <MapboxFocusButton focusKey="ip-info" />
        }
      />

      <Divider />

      <List dense>
        <DataItem name="Organisation"><IpInfoOrganization ip={ip} /></DataItem>
      </List>

      <Divider />

      <List dense>
        <DataItem name="Adresse"><IpInfoAddress ip={ip} /></DataItem>
        <DataItem name="Région"><IpInfoState ip={ip} /></DataItem>
        <DataItem name="Pays"><IpInfoCountry ip={ip} /></DataItem>
      </List>
    </Card>
  );
}
