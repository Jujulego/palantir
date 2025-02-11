'use client';

// noinspection ES6UnusedImports
import type {} from '@mui/material/themeCssVarsAugmentation';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

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
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  }
});

export default theme;
