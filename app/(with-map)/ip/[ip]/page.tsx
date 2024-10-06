import botPng from '@/assets/bot.png';
import computerPng from '@/assets/computer.png';
import datacenterPng from '@/assets/datacenter.png';
import AddressTypography from '@/components/common/AddressTypography';
import ColoredImage from '@/components/common/ColoredImage';
import MapboxFlyTo from '@/components/mapbox/MapboxFlyTo';
import MapboxMarker from '@/components/mapbox/MapboxMarker';
import MapboxSpin from '@/components/mapbox/MapboxSpin';
import { mergeIpMetadata } from '@/data/ip-metadata';
import { fetchBigDataCloud } from '@/data/sources/big-data-cloud';
import { fetchIpData } from '@/data/sources/ip-data';
import { fetchIpGeolocation } from '@/data/sources/ip-geolocation';
import { fetchIpInfo } from '@/data/sources/ip-info';
import { fetchIpQualityScore } from '@/data/sources/ip-quality-score';
import HubIcon from '@mui/icons-material/Hub';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ipaddr from 'ipaddr.js';
import LabelIcon from '@mui/icons-material/Label';
import Chip from '@mui/material/Chip';

// Page
export interface WithMapIpPageProps {
  readonly params: {
    readonly ip: string;
  }
}

export default async function WithMapIpPage({ params }: WithMapIpPageProps) {
  const ip = decodeURIComponent(params.ip);
  const parsed = ipaddr.parse(ip);

  const { hostname, address, asn, coordinates, tags } = mergeIpMetadata(await Promise.all([
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

      <Divider sx={{ mb: 1 }} />

      { address && (
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2.5, py: 1, gap: 2 }}>
          <LocationCityIcon color="primary" />

          <Typography>
            <AddressTypography address={address} />
          </Typography>
        </Box>
      ) }

      { asn && (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', alignItems: 'center', px: 2.5, py: 1, columnGap: 2 }}>
          <HubIcon color="primary" sx={{ gridRow: 'span 2' }} />

          <Typography>AS{ asn.asn }</Typography>
          <Typography noWrap>{ asn.organisation }</Typography>
        </Box>
      ) }

      { tags.length > 0 && (
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2.5, py: 1, gap: 2 }}>
          <LabelIcon color="primary" />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            { tags.map((tag) => (
              <Chip key={tag.label} label={tag.label} size="small" color={tag.color} />
            )) }
          </Box>
        </Box>
      ) }
    </Paper>

    { coordinates ? (
      <>
        <MapboxMarker latitude={coordinates.latitude} longitude={coordinates.longitude} />
        <MapboxFlyTo latitude={coordinates.latitude} longitude={coordinates.longitude} zoom={5} />
      </>
    ) : (
      <MapboxSpin />
    ) }
  </>;
}
