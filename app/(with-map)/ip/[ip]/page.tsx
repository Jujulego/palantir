import computer from '@/assets/computer.png';
import ColoredImage from '@/components/common/ColoredImage';
import MapboxFlyTo from '@/components/mapbox/MapboxFlyTo';
import MapboxMarker from '@/components/mapbox/MapboxMarker';
import MapboxSpin from '@/components/mapbox/MapboxSpin';
import { fetchIpInfo } from '@/data/sources/ip-info';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

// Page
export interface TotoIpPageProps {
  readonly params: {
    readonly ip: string;
  }
}

export default async function WithMapIpPage({ params }: TotoIpPageProps) {
  const { location } = await fetchIpInfo(decodeURIComponent(params.ip));

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

    </Paper>

    { location?.coordinates ? (
      <>
        <MapboxMarker latitude={location.coordinates.latitude} longitude={location.coordinates.longitude} />
        <MapboxFlyTo latitude={location.coordinates.latitude} longitude={location.coordinates.longitude} zoom={5} />
      </>
    ) : (
      <MapboxSpin />
    ) }
  </>;
}
