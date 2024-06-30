'use client';

import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = extendTheme({
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
