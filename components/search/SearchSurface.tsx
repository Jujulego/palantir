import Paper from '@mui/material/Paper';
import { styled, type SxProps, type Theme } from '@mui/material/styles';
import { m } from 'motion/react';
import { memo, type ReactNode } from 'react';

// Component
export interface SearchSurfaceProps {
  readonly isOpen: boolean;

  readonly children?: ReactNode;
  readonly sx?: SxProps<Theme>;
}

function SearchSurface({ isOpen, children, sx }: SearchSurfaceProps) {
  const borderRadius = isOpen ? 16 : 24;

  return (
    <SearchPlaceholder
      initial={{ borderRadius }}
      animate={{ borderRadius }}
      sx={sx}
    >
      <SearchPaper
        initial={{ borderRadius }}
        animate={{ borderRadius }}
        sx={sx}
      >
        {children}
      </SearchPaper>
    </SearchPlaceholder>
  );
}

export default memo(SearchSurface);

// Elements
const SearchPlaceholder = styled(m.div)({
  position: 'relative',
});

const SearchPaper = styled(m.create(Paper))({
  position: 'absolute',
  minHeight: '100%',
  width: '100%',
  overflow: 'auto',
});