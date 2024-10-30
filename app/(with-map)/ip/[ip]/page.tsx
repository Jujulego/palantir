import { MergedAsnMenu } from '@/components/asn/MergedAsnMenu';
import { MergedLocationMenu } from '@/components/location/MergedLocationMenu';
import IpDataChip from '@/components/source/IpDataChip';
import IpInfoChip from '@/components/source/IpInfoChip';
import IpQualityScoreChip from '@/components/source/IpQualityScoreChip';
import { reverseDnsLookup } from '@/data/dns';
import { mergeIpMetadata } from '@/data/ip-metadata';
import { fetchBigDataCloud } from '@/data/sources/big-data-cloud';
import { fetchIpData } from '@/data/sources/ip-data';
import { fetchIpGeolocation } from '@/data/sources/ip-geolocation';
import { fetchIpInfo } from '@/data/sources/ip-info';
import { fetchIpQualityScore } from '@/data/sources/ip-quality-score';
import LabelIcon from '@mui/icons-material/Label';
import { List, ListItem, ListItemIcon } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ipaddr from 'ipaddr.js';

// Page
export interface WithMapIpPageProps {
  readonly params: {
    readonly ip: string;
  };
}

export default async function WithMapIpPage({ params }: WithMapIpPageProps) {
  const ip = decodeURIComponent(params.ip);
  const parsed = ipaddr.parse(ip);

  const { asn, hostname, location, tags } = mergeIpMetadata(await Promise.all([
    fetchIpInfo(ip),
    fetchIpQualityScore(ip),
    fetchIpGeolocation(ip),
    fetchIpData(ip),
    fetchBigDataCloud(ip),
  ]));

  // Render
  return <Paper component="main" square sx={{ flex: '1 0 auto', pb: 4 }}>
    <Box sx={{ px: 2.5, py: 2 }}>
      <Typography component="h1" variant="h5">{ parsed.toString() }</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>{ await reverseDnsLookup(ip) }</Typography>
    </Box>

    <Divider />

    <Box component="nav" sx={{ display: 'flex', flexWrap: 'wrap', px: 2, pt: 1, gap: 1 }}>
      <IpInfoChip size="small" />
      <IpQualityScoreChip size="small" />
      <Chip label="ipgeolocation" size="small" />
      <IpDataChip size="small" />
      <Chip label="BigDataCloud" size="small" />
    </Box>

    <List>
      { location.length && (
        <MergedLocationMenu options={location} />
      ) }

      { asn.length && (
        <MergedAsnMenu options={asn} />
      ) }

      { tags.length > 0 && (
        <ListItem disablePadding sx={{ minHeight: 56, px: 2 }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <LabelIcon color="primary" />
          </ListItemIcon>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            { tags.map((tag) => (
              <Chip key={tag.label} label={tag.label} size="small" color={tag.color} />
            )) }
          </Box>
        </ListItem>
      ) }
    </List>
  </Paper>;
}
