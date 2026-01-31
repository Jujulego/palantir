import { decodeName, type WithMapAnimalNameParams } from '@/app/(with-map)/animal/[name]/params';
import MapDrawerHeader from '@/components/map/drawer/MapDrawerHeader';
import IconLink from '@/components/mui/IconLink';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import type { Metadata } from 'next';

// Layout
export default async function WithMapAnimalNameLayout({ children, params }: LayoutProps<'/animal/[name]'>) {
  const name = await decodeName(params);

  return (
    <>
      <MapDrawerHeader className="flex pl-5 pr-2 py-4">
        <h1 className="typography-h5 capitalize flex-1">
          { name }
        </h1>

        <IconLink
          href="/"
          sx={{ flex: '0 0 auto', mt: -1 }}
          aria-label="Close panel"
        >
          <CloseIcon />
        </IconLink>
      </MapDrawerHeader>

      <Divider />

      <div className="grow shrink-0 basis-0 overflow-auto">
        { children }
      </div>
    </>
  );
}

export async function generateMetadata({ params }: LayoutProps<'/animal/[name]'>): Promise<Metadata> {
  const name = await decodeName(params);

  return {
    title: name.charAt(0).toUpperCase() + name.slice(1),
  };
}

export function generateStaticParams(): WithMapAnimalNameParams[] {
  return [
    { name: 'babar' },
    { name: 'boreo' },
    { name: 'charlotte' },
    { name: 'daisy' },
    { name: 'lucille' },
    { name: 'tidal' },
    { name: 'zaza' },
  ];
}
