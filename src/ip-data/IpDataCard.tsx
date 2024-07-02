import { Avatar, CardHeader, Divider, List, SxProps } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { Suspense } from 'react';

import DataCard from '@/src/common/DataCard';
import DataItem from '@/src/common/DataItem';
import IpDataAddress from '@/src/ip-data/IpDataAddress';
import IpDataCountry from '@/src/ip-data/IpDataCountry';
import IpDataContinent from '@/src/ip-data/IpDataContinent';
import IpDataOrganization from '@/src/ip-data/IpDataOrganization';
import IpDataState from '@/src/ip-data/IpDataState';
import IpDataTags from '@/src/ip-data/IpDataTags';

// Component
export interface IpDataCardProps {
  readonly ip: string;
  readonly sx?: SxProps;
}

export default function IpDataCard({ ip, sx }: IpDataCardProps) {
  return (
    <DataCard
      focusKey="ip-data"
      header={
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: deepPurple[300] }}>DA</Avatar>}
          title={<>
            IP Data
            <Suspense>
              <IpDataTags ip={ip} />
            </Suspense>
          </>}
          subheader={ip}
        />
      }
      sx={sx}
    >
      <List dense>
        <DataItem name="Organisation"><IpDataOrganization ip={ip} /></DataItem>
      </List>

      <Divider />

      <List dense>
        <DataItem name="Adresse"><IpDataAddress ip={ip} /></DataItem>
        <DataItem name="Région"><IpDataState ip={ip} /></DataItem>
        <DataItem name="Pays"><IpDataCountry ip={ip} /></DataItem>
        <DataItem name="Continent"><IpDataContinent ip={ip} /></DataItem>
      </List>
    </DataCard>
  );
}

