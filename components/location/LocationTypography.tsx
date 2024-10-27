import type { IpMetadata, MergedIpLocation } from '@/data/ip-metadata';
import addressFormatter from '@fragaria/address-formatter';
import Box from '@mui/material/Box';
import { Fragment } from 'react';

export interface LocationTypographyProps {
  readonly location: IpMetadata | MergedIpLocation;
}

export default function LocationTypography({ location }: LocationTypographyProps) {
  if (hasAddress(location)) {
    const lines = addressFormatter.format({ ...location.address, country: undefined }, { output: 'array' });

    return <>{lines.map((line, idx) => (
      <Fragment key={line}>
        {idx > 0 && <>,&nbsp;</>}
        {line}
      </Fragment>
    ))}</>;
  } else if (location.coordinates) {
    const lat = degreeFormat.format(location.coordinates.latitude);
    const lng = degreeFormat.format(location.coordinates.longitude);

    return <>{ lat }&nbsp;{ lng }</>;
  }

  return <Box sx={{ color: 'text.secondary' }}>Unknown location</Box>;
}

// Utils
const degreeFormat = new Intl.NumberFormat('fr-FR', {
  style: 'unit',
  unit: 'degree',
  maximumFractionDigits: 5,
  signDisplay: 'always',
});

function hasAddress(location: IpMetadata | MergedIpLocation) {
  return location.address?.city || location.address?.postalCode || location.address?.region;
}