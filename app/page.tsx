import IpGeolocationCard from '@/src/ip-geolocation/IpGeolocationCard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, NoSsr } from '@mui/material';

import IpGeolocationMarker from '@/src/ip-geolocation/IpGeolocationMarker';
import MapboxMap from '@/src/mapbox/MapboxMap';
import MapboxNavigationControl from '@/src/mapbox/MapboxNavigationControl';
import SearchBar from '@/src/search/SearchBar';

// Page
export interface HomeProps {
  readonly searchParams: {
    readonly ip?: string;
  }
}

export default function Home(props: HomeProps) {
  const { ip } = props.searchParams;

  return (
    <Box component="main" display="flex" flexDirection="column" position="relative" height="100vh" width="100vw">
      <MapboxMap sx={{ flex: 1 }}>
        <Box position="absolute" left={16} top={16} zIndex="appBar" width={376}>
          <SearchBar />
        </Box>

        <NoSsr>
          <MapboxNavigationControl />
        </NoSsr>

        { ip && (
          <>
            <IpGeolocationMarker ip={ip} />

            <Box position="absolute" left={16} top={80} zIndex={10} width={376}>
              <IpGeolocationCard ip={ip} />
            </Box>
          </>
        ) }
      </MapboxMap>
    </Box>
  );
}
