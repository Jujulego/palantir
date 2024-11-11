'use client';

import { useTheme } from '@mui/material/styles';

export default function MetaThemeColor() {
  const theme = useTheme();

  return (
    <meta name="theme-color" color={theme.palette.background.paper} />
  );
}