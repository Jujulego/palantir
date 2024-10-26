import type { Address } from '@/data/ip-metadata';
import addressFormatter from '@fragaria/address-formatter';
import { Fragment } from 'react';

export interface AddressTypographyProps {
  readonly address: Address;
}

export default function AddressTypography({ address }: AddressTypographyProps) {
  const lines = addressFormatter.format({ ...address, country: undefined }, { output: 'array' });

  return <>{ lines.map((line, idx) => (
    <Fragment key={line}>
      { idx > 0 && <>,&nbsp;</> }
      { line }
    </Fragment>
  )) }</>;
}
