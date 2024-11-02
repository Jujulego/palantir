import type { Address, Coordinates } from '@/data/ip-metadata';
import addressFormatter from '@fragaria/address-formatter';
import Box from '@mui/material/Box';
import { Fragment } from 'react';

export interface LocationTypographyProps {
  readonly address?: Address;
  readonly coordinates?: Coordinates;
}

export default function LocationTypography({ address, coordinates }: LocationTypographyProps) {
  if (hasAddress(address)) {
    const lines = addressFormatter.format({ ...address, country: undefined }, { output: 'array' });

    return <>{lines.map((line, idx) => (
      <Fragment key={line}>
        {idx > 0 && <>,&nbsp;</>}
        {line}
      </Fragment>
    ))}</>;
  } else if (coordinates) {
    const lat = degreeFormat.format(coordinates.latitude);
    const lng = degreeFormat.format(coordinates.longitude);

    return <>{ lat }&nbsp;{ lng }</>;
  }

  return <Box component="span" sx={{ color: 'text.secondary' }}>Unknown location</Box>;
}

// Utils
const degreeFormat = new Intl.NumberFormat('fr-FR', {
  style: 'unit',
  unit: 'degree',
  maximumFractionDigits: 5,
  signDisplay: 'always',
});

function hasAddress(address?: Address) {
  return address?.city || address?.postalCode || address?.region;
}