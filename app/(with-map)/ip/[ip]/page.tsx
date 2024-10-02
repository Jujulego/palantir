import computer from '@/assets/computer.png';
import AddressTypography from '@/components/common/AddressTypography';
import ColoredImage from '@/components/common/ColoredImage';
import MapboxFlyTo from '@/components/mapbox/MapboxFlyTo';
import MapboxMarker from '@/components/mapbox/MapboxMarker';
import MapboxSpin from '@/components/mapbox/MapboxSpin';
import { fetchIpInfo } from '@/data/sources/ip-info';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ipaddr from 'ipaddr.js';

// Page
export interface WithMapIpPageProps {
  readonly params: {
    readonly ip: string;
  }
}

export default async function WithMapIpPage({ params }: WithMapIpPageProps) {
  const ip = decodeURIComponent(params.ip);
  const parsed = ipaddr.parse(ip);

  const { hostname, address, coordinates } = await fetchIpInfo(ip);

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
      <ColoredImage
        src={computer}
        alt="computer"
        style={{ position: 'absolute', bottom: 0, left: 'calc(50% - 75px)', height: 'auto', width: 150 }}
      />
    </Box>

    <Paper component="main" square sx={{ flex: '1 0 auto', pb: 4 }}>
      <Box sx={{ px: 2.5, py: 2 }}>
        <Typography component="h1" variant="h5">{ parsed.toString() }</Typography>
        { hostname && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>{ hostname }</Typography>
        ) }
      </Box>

      <Divider />

      { address && (
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2.5, py: 2, gap: 2 }}>
          <LocationCityIcon color="primary" />

          <Typography>
            <AddressTypography address={address} />
          </Typography>
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
