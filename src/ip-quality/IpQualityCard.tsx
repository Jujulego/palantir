import IpQualityMarker from '@/src/ip-quality/IpQualityMarker';
import Avatar from '@mui/material/Avatar';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import { yellow } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import type { SxProps } from '@mui/material/styles';
import { Suspense } from 'react';

import DataCard from '@/src/common/DataCard';
import DataItem from '@/src/common/DataItem';
import IpQualityAddress from '@/src/ip-quality/IpQualityAddress';
import IpQualityCountry from '@/src/ip-quality/IpQualityCountry';
import IpQualityHostname from '@/src/ip-quality/IpQualityHostname';
import IpQualityISP from '@/src/ip-quality/IpQualityISP';
import IpQualityOrganization from '@/src/ip-quality/IpQualityOrganization';
import IpQualityPayload from '@/src/ip-quality/IpQualityPayload';
import IpQualityState from '@/src/ip-quality/IpQualityState';
import IpQualityTags from '@/src/ip-quality/IpQualityTags';

// Component
export interface IpQualityCardProps {
  readonly ip: string;
  readonly sx?: SxProps;
}

export default function IpQualityCard({ ip, sx }: IpQualityCardProps) {
  return (<>
    <DataCard
      focusKey="ip-quality"
      header={
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: yellow[300] }}>QU</Avatar>}
          title={<>
            IP Quality
            <Suspense>
              <IpQualityTags ip={ip} />
            </Suspense>
          </>}
          subheader={
            <Suspense fallback={ip}>
              <IpQualityHostname ip={ip} />
            </Suspense>
          }
        />
      }
      sx={sx}
    >
      <List dense>
        <DataItem name="ISP"><IpQualityISP ip={ip} /></DataItem>
        <DataItem name="Organisation"><IpQualityOrganization ip={ip} /></DataItem>
      </List>

      <Divider />

      <List dense>
        <DataItem name="Adresse"><IpQualityAddress ip={ip} /></DataItem>
        <DataItem name="Région"><IpQualityState ip={ip} /></DataItem>
        <DataItem name="Pays"><IpQualityCountry ip={ip} /></DataItem>
      </List>

      <Divider />

      <CardActions>
        <Suspense fallback={<Skeleton variant="rounded" width={100} height={30} />}>
          <IpQualityPayload ip={ip} />
        </Suspense>
      </CardActions>
    </DataCard>

    <Suspense>
      <IpQualityMarker ip={ip} />
    </Suspense>
  </>);
}

