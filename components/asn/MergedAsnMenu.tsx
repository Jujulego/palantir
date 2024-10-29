'use client';

import { MergedMenu } from '@/components/common/MergedMenu';
import SourceChip from '@/components/source/SourceChip';
import type { MergedIpAsn } from '@/data/ip-metadata';
import HubIcon from '@mui/icons-material/Hub';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { type ReadonlyURLSearchParams, usePathname, useSearchParams } from 'next/navigation';

export interface MergedAsnMenuProps {
  readonly options: readonly MergedIpAsn[];
}

export function MergedAsnMenu({ options }: MergedAsnMenuProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Extract selected location
  const selectedSource = searchParams.get('asn');
  const selected = selectedSource
    && options.find((asn) => asn.sourceId.includes(selectedSource))
    || options[0];

  // Render
  if (!selected) {
    return null;
  }

  return (
    <MergedMenu
      content={<>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <HubIcon color="primary" />
        </ListItemIcon>

        <ListItemText
          primary={selected.organisation} primaryTypographyProps={{ noWrap: true }}
          secondary={`AS${selected.asn}`}
        />
      </>}
    >
      { options.map((asn) => (
        <ListItemButton
          key={asn.asn}
          component={Link}
          href={changeSourceHref(pathname, searchParams, asn.sourceId[0])}
          replace
          selected={selectedSource ? asn.sourceId.includes(selectedSource) : false}
        >
          <ListItemText
            primary={
              <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                <span>{ asn.organisation }</span>
                <SourceChip id={asn.sourceId[0]} variant="outlined" size="small" sx={{ my: -0.5 }} />
              </Box>
            }
            secondary={`AS${asn.asn}`}
          />
        </ListItemButton>
      )) }
    </MergedMenu>
  );
}

// Utils
function changeSourceHref(pathname: string, searchParams: ReadonlyURLSearchParams, source: string) {
  const params = new URLSearchParams(searchParams);
  params.set('asn', source);

  return `${pathname}?${params}`;
}
