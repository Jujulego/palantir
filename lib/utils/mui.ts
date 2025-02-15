import type { SxProps, Theme } from '@mui/material/styles';

export function mergeSx(...props: (SxProps<Theme> | undefined)[]): SxProps<Theme> {
  return props.filter((sx) => sx !== undefined).flat(1);
}
