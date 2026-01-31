import computerPng from '@/assets/computer.png';
import MapDrawer from '@/components/map/drawer/MapDrawer';
import MapDrawerIllustration from '@/components/map/drawer/MapDrawerIllustration';
import ColoredImage from '@/components/utils/ColoredImage';
import Paper from '@mui/material/Paper';

// Layout
export default function WithMapServerLayout({ children }: LayoutProps<'/server'>) {
  return (
    <MapDrawer>
      <MapDrawerIllustration>
        <div className="relative h-57.5 text-action-selected">
          <ColoredImage
            src={computerPng}
            alt="computer"
            preload
            style={{ position: 'absolute', bottom: 0, left: 'calc(50% - 75px)', height: 'auto', width: 150 }}
          />
        </div>
      </MapDrawerIllustration>

      <Paper square sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        { children }
      </Paper>
    </MapDrawer>
  );
}
