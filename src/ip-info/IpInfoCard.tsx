import Avatar from '@mui/material/Avatar';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import { green } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import type { SxProps } from '@mui/material/styles';
import { Suspense } from 'react';

import DataCard from '@/src/common/DataCard';
import DataItem from '@/src/common/DataItem';
import IpInfoAddress from '@/src/ip-info/IpInfoAddress';
import IpInfoCountry from '@/src/ip-info/IpInfoCountry';
import IpInfoHostname from '@/src/ip-info/IpInfoHostname';
import IpInfoOrganization from '@/src/ip-info/IpInfoOrganization';
import IpInfoPayload from '@/src/ip-info/IpInfoPayload';
import IpInfoState from '@/src/ip-info/IpInfoState';

// Component
export interface IpInfoCardProps {
  readonly ip: string;
  readonly sx?: SxProps;
}

export default function IpInfoCard({ ip, sx }: IpInfoCardProps) {
  return (
    <DataCard
      focusKey="ip-info"
      header={
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: green[300] }}>IN</Avatar>}
          title="IP Info"
          subheader={
            <Suspense fallback={ip}>
              <IpInfoHostname ip={ip} />
            </Suspense>
          }
        />
      }
      sx={sx}
    >
      <List dense>
        <DataItem name="Organisation"><IpInfoOrganization ip={ip} /></DataItem>
      </List>

      <Divider />

      <List dense>
        <DataItem name="Adresse"><IpInfoAddress ip={ip} /></DataItem>
        <DataItem name="Région"><IpInfoState ip={ip} /></DataItem>
        <DataItem name="Pays"><IpInfoCountry ip={ip} /></DataItem>
      </List>

      <Divider />

      <CardActions>
        <Suspense fallback={<Skeleton variant="rounded" width={100} height={30} />}>
          <IpInfoPayload ip={ip} />
        </Suspense>
      </CardActions>
    </DataCard>
  );
}

