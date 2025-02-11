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
        mode: 'dark'
      },
    }
  },
  palette: {
    bigDataCloud: base.palette.augmentColor({
      name: 'bigDataCloud',
      color: {
        main: '#e36327'
      }
    })
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

declare module '@mui/material/styles' {
  interface Palette {
    bigDataCloud: PaletteColor;
  }

  interface PaletteOptions {
    bigDataCloud?: PaletteColorOptions;
  }
}
