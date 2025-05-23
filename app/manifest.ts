import theme from '@/theme';
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Palantir',
    short_name: 'Palantir',
    description: 'One map to locate them all',
    start_url: '/',
    display: 'standalone',
    theme_color: theme.palette.primary.dark,
    background_color: '#04162a',
    icons: [
      { src: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { src: '/icon-mask.png', type: 'image/png', sizes: '512x512', purpose: 'maskable' },
      { src: '/icon-512.png', type: 'image/png', sizes: '512x512' },
      { src: '/icon.svg', type: 'image/svg', sizes: 'any' }
    ]
  };
}
