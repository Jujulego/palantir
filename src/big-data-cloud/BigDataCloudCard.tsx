import CardActions from '@mui/material/CardActions';
import { pink } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import type { SxProps } from '@mui/material/styles';
import { Suspense } from 'react';

import BigDataCloudAddress from '@/src/big-data-cloud/BigDataCloudAddress';
import BigDataCloudArea from '@/src/big-data-cloud/BigDataCloudArea';
import BigDataCloudAS from '@/src/big-data-cloud/BigDataCloudAS';
import BigDataCloudContinent from '@/src/big-data-cloud/BigDataCloudContinent';
import BigDataCloudCountry from '@/src/big-data-cloud/BigDataCloudCountry';
import BigDataCloudISP from '@/src/big-data-cloud/BigDataCloudISP';
import BigDataCloudMarker from '@/src/big-data-cloud/BigDataCloudMarker';
import BigDataCloudOrganization from '@/src/big-data-cloud/BigDataCloudOrganization';
import BigDataCloudPayload from '@/src/big-data-cloud/BigDataCloudPayload';
import BigDataCloudStateState from '@/src/big-data-cloud/BigDataCloudState';
import BigDataCloudTags from '@/src/big-data-cloud/BigDataCloudTags';
import DataCard from '@/src/common/DataCard';
import DataItem from '@/src/common/DataItem';

// Component
export interface BigDataCloudCardProps {
  readonly ip: string;
  readonly sx?: SxProps;
}

export default function BigDataCloudCard({ ip, sx }: BigDataCloudCardProps) {
  return (<>
    <DataCard
      focusKey="big-data-cloud"
      header={
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: pink[300] }}>BD</Avatar>}
          title={<>
            Big Data Cloud
            <Suspense>
              <BigDataCloudTags ip={ip} />
            </Suspense>
          </>}
          titleTypographyProps={{ noWrap: true }}
          subheader={ip}
        />
      }
      sx={sx}
    >
      <List dense>
        <DataItem name="ISP"><BigDataCloudISP ip={ip} /></DataItem>
        <DataItem name="AS"><BigDataCloudAS ip={ip} /></DataItem>
        <DataItem name="Organisation"><BigDataCloudOrganization ip={ip} /></DataItem>
      </List>

      <Divider />

      <List dense>
        <DataItem name="Adresse"><BigDataCloudAddress ip={ip} /></DataItem>
        <DataItem name="Région"><BigDataCloudStateState ip={ip} /></DataItem>
        <DataItem name="Pays"><BigDataCloudCountry ip={ip} /></DataItem>
        <DataItem name="Continent"><BigDataCloudContinent ip={ip} /></DataItem>
      </List>

      <Divider />

      <CardActions>
        <Suspense fallback={<Skeleton variant="rounded" width={100} height={30} />}>
          <BigDataCloudPayload ip={ip} />
        </Suspense>
      </CardActions>
    </DataCard>

    <Suspense>
      <BigDataCloudArea ip={ip} />
      <BigDataCloudMarker ip={ip} />
    </Suspense>
  </>);
}

