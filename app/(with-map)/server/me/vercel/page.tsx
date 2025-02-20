import MapSpin from '@/components/map/MapSpin';
import ServerMarker from '@/components/server/ServerMarker';
import LocationItem from '@/components/utils/LocationItem';
import { vercelIpAddress, vercelIpCoordinates } from '@/lib/server/vercel/extractors';
import List from '@mui/material/List';

// Page
export default async function WithMapServerMePageVercel() {
  const coordinates = await vercelIpCoordinates();

  return (
    <List>
      <LocationItem address={await vercelIpAddress()} coordinates={coordinates} />

      { coordinates
        ? <ServerMarker coordinates={coordinates} markerKey="vercel" tooltip="Vercel" sx={{ color: 'primary.main' }} />
        : <MapSpin /> }
    </List>
  );
}
