import BigDataCloudTags from '@/src/big-data-cloud/BigDataCloudTags';
import { Avatar, Card, CardHeader, Divider, List } from '@mui/material';
import { pink } from '@mui/material/colors';
import { Suspense } from 'react';

import BigDataCloudAddress from '@/src/big-data-cloud/BigDataCloudAddress';
import BigDataCloudAS from '@/src/big-data-cloud/BigDataCloudAS';
import BigDataCloudContinent from '@/src/big-data-cloud/BigDataCloudContinent';
import BigDataCloudCountry from '@/src/big-data-cloud/BigDataCloudCountry';
import BigDataCloudISP from '@/src/big-data-cloud/BigDataCloudISP';
import BigDataCloudOrganization from '@/src/big-data-cloud/BigDataCloudOrganization';
import BigDataCloudStateState from '@/src/big-data-cloud/BigDataCloudState';
import DataItem from '@/src/common/DataItem';
import MapboxFocusButton from '@/src/mapbox/MapboxFocusButton';

// Component
export interface BigDataCloudCardProps {
  readonly ip: string;
}

export default function BigDataCloudCard({ ip }: BigDataCloudCardProps) {
  return (
    <Card>
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
        action={
          <MapboxFocusButton focusKey="big-data-cloud" />
        }
      />

      <Divider />

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
    </Card>
  );
}

