import Avatar from '@mui/material/Avatar';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import { blue } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import type { SxProps } from '@mui/material/styles';
import { Suspense } from 'react';

import DataCard from '@/src/common/DataCard';
import DataItem from '@/src/common/DataItem';
import IpGeolocationAddress from '@/src/ip-geolocation/IpGeolocationAddress';
import IpGeolocationConnectionType from '@/src/ip-geolocation/IpGeolocationConnectionType';
import IpGeolocationContinent from '@/src/ip-geolocation/IpGeolocationContinent';
import IpGeolocationCountry from '@/src/ip-geolocation/IpGeolocationCountry';
import IpGeolocationISP from '@/src/ip-geolocation/IpGeolocationISP';
import IpGeolocationOrganization from '@/src/ip-geolocation/IpGeolocationOrganization';
import IpGeolocationPayload from '@/src/ip-geolocation/IpGeolocationPayload';
import IpGeolocationState from '@/src/ip-geolocation/IpGeolocationState';

// Component
export interface IpGeolocationCardProps {
  readonly ip: string;
  readonly sx?: SxProps;
}

export default function IpGeolocationCard({ ip, sx }: IpGeolocationCardProps) {
  return (
    <DataCard
      focusKey="ip-geolocation"
      header={
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: blue[300] }}>GL</Avatar>}
          title={<>
            IP Geolocation
            <Suspense>
              <IpGeolocationConnectionType ip={ip} sx={{ ml: 1, my: -0.25 }} />
            </Suspense>
          </>}
          subheader={ip}
        />
      }
      sx={sx}
    >
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

      <Divider />

      <CardActions>
        <Suspense fallback={<Skeleton variant="rounded" width={100} height={30} />}>
          <IpGeolocationPayload ip={ip} />
        </Suspense>
      </CardActions>
    </DataCard>
  );
}

