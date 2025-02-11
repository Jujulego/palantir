import type { Address } from '@/lib/utils/address';
import type { Location } from '@/lib/utils/location';
import addressFormatter from '@fragaria/address-formatter';
import Box from '@mui/material/Box';
import { Fragment } from 'react';

export interface LocationTypographyProps {
  readonly address?: Address;
  readonly location?: Location | null;
}

export default function LocationTypography({ address, location }: LocationTypographyProps) {
  if (hasAddress(address)) {
    const lines = addressFormatter.format({ ...address, country: undefined }, { output: 'array' });

    return <>{lines.map((line, idx) => (
      <Fragment key={line}>
        {idx > 0 && <>,&nbsp;</>}
        {line}
      </Fragment>
    ))}</>;
  } else if (location) {
    const lat = degreeFormat.format(location.latitude);
    const lng = degreeFormat.format(location.longitude);

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
