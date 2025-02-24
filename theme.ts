'use client';

// noinspection ES6UnusedImports
import type {} from '@mui/material/themeCssVarsAugmentation';
import { createTheme, type PaletteColor, type PaletteColorOptions } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

// Font
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// Theme
const base = createTheme({});

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class'
  },
  colorSchemes: {
    light: {
      palette: {
        mode: 'light'
      }
    },
    dark: {
      palette: {
        mode: 'dark',
        vercel: base.palette.augmentColor({
          name: 'vercel',
          color: {
            main: '#ffffff'
          }
        }),
      },
    }
  },
  components: {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
        }
      }
    }
  },
  palette: {
    bigDataCloud: base.palette.augmentColor({
      name: 'bigDataCloud',
      color: {
        main: '#e36327'
      }
    }),
    ipData: base.palette.augmentColor({
      name: 'ipData',
      color: {
        main: '#3598d4'
      }
    }),
    ipGeolocation: base.palette.augmentColor({
      name: 'ipGeolocation',
      color: {
        main: '#6c63fd'
      }
    }),
    ipInfo: base.palette.augmentColor({
      name: 'ipInfo',
      color: {
        main: '#3091cf'
      }
    }),
    ipQualityScore: base.palette.augmentColor({
      name: 'ipQualityScore',
      color: {
        main: '#f43a3a'
      }
    }),
    vercel: base.palette.augmentColor({
      name: 'vercel',
      color: {
        main: '#000000'
      }
    }),
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});

export default theme;

// Type enhancements
declare module '@mui/material/styles' {
  interface Palette {
    bigDataCloud: PaletteColor;
    ipData: PaletteColor;
    ipGeolocation: PaletteColor;
    ipInfo: PaletteColor;
    ipQualityScore: PaletteColor;
    vercel: PaletteColor;
  }

  interface PaletteOptions {
    bigDataCloud?: PaletteColorOptions;
    ipData?: PaletteColorOptions;
    ipGeolocation?: PaletteColorOptions;
    ipInfo?: PaletteColorOptions;
    ipQualityScore?: PaletteColorOptions;
    vercel?: PaletteColorOptions;
  }
}

declare module 'react' {
  interface CSSProperties {
    '--MapboxMap-left'?: string;

    '--VirtualCell-background'?: string;
    '--VirtualCell-position'?: string;
    '--VirtualCell-rowIndex'?: string;
    '--VirtualCell-zIndex'?: string;
  }
}
