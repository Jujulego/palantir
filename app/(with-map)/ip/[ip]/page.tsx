import botPng from '@/assets/bot.png';
import computerPng from '@/assets/computer.png';
import datacenterPng from '@/assets/datacenter.png';
import { MergedAsnMenu } from '@/components/asn/MergedAsnMenu';
import ColoredImage from '@/components/common/ColoredImage';
import { MergedLocationMenu } from '@/components/location/MergedLocationMenu';
import { mergeIpMetadata } from '@/data/ip-metadata';
import { validateSourceIdParam } from '@/data/sources';
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
  readonly searchParams: {
    readonly source?: string;
  };
}

export default async function WithMapIpPage({ params, searchParams }: WithMapIpPageProps) {
  const ip = decodeURIComponent(params.ip);
  const parsed = ipaddr.parse(ip);

  const sourceId = validateSourceIdParam(searchParams.source);

  const { asn, hostname, location, tags } = mergeIpMetadata(await Promise.all([
    fetchIpInfo(ip),
    fetchIpQualityScore(ip),
    fetchIpGeolocation(ip),
    fetchIpData(ip),
    fetchBigDataCloud(ip),
  ]));

  const is_bot = tags.some((tag) => tag.label === 'bot');
  const is_datacenter = tags.some((tag) => tag.label === 'datacenter');

  // Render
  return <>
    <Box
      sx={{
        position: 'relative',
        height: 230,
        flexShrink: 0,
        color: 'action.selected',
      }}
    >
      { is_bot ? (
        <ColoredImage
          src={botPng}
          alt="bot"
          style={{ position: 'absolute', bottom: 0, left: 'calc(50% - 75px)', height: 'auto', width: 150 }}
        />
      ) : is_datacenter ? (
        <ColoredImage
          src={datacenterPng}
          alt="datacenter"
          style={{ position: 'absolute', bottom: 0, left: 'calc(50% - 75px)', height: 'auto', width: 150 }}
        />
      ) : (
        <ColoredImage
          src={computerPng}
          alt="computer"
          style={{ position: 'absolute', bottom: 0, left: 'calc(50% - 75px)', height: 'auto', width: 150 }}
        />
      ) }
    </Box>

    <Paper component="main" square sx={{ flex: '1 0 auto', pb: 4 }}>
      <Box sx={{ px: 2.5, py: 2 }}>
        <Typography component="h1" variant="h5">{ parsed.toString() }</Typography>
        { hostname && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>{ hostname }</Typography>
        ) }
      </Box>

      <Divider />

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
    </Paper>
  </>;
}
