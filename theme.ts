'use client';

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
      map: {
        light: 'night',
      },
    }
  },
  map: {
    light: 'day',
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 12,
        }
      }
    }
  }
});

export default theme;

declare module '@mui/material/styles' {
  export interface Theme {
    map: {
      light: 'dawn' | 'day' | 'dusk' | 'night';
    };
  }

  export interface ThemeOptions {
    map?: {
      light?: 'dawn' | 'day' | 'dusk' | 'night';
    };
  }

  export interface ColorSystemOptions {
    map?: {
      light?: 'dawn' | 'day' | 'dusk' | 'night';
    };
  }
}
