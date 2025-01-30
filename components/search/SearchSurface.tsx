import { useFocusWithin } from '@/hooks/useFocusWithin';
import Paper from '@mui/material/Paper';
import { styled, type SxProps, type Theme } from '@mui/material/styles';
import { m } from 'motion/react';
import { type KeyboardEvent, type ReactNode, useCallback } from 'react';

// Component
export interface SearchSurfaceProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;

  readonly children?: ReactNode;
  readonly sx?: SxProps<Theme>;
}

export default function SearchSurface({ isOpen, onClose, children, sx }: SearchSurfaceProps) {
  // Track focus
  const focusProps = useFocusWithin({
    onBlur: onClose,
  });

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // Render
  const borderRadius = isOpen ? 16 : 24;

  return (
    <SearchPlaceholder
      initial={{ borderRadius }}
      animate={{ borderRadius }}
      sx={sx}
    >
      <Paper
        component={SearchPaper}
        initial={{ borderRadius }}
        animate={{ borderRadius }}

        {...focusProps}
        onKeyDown={handleKeyDown}
      >
        {children}
      </Paper>
    </SearchPlaceholder>
  );
}

// Elements
const SearchPlaceholder = styled(m.div)({
  position: 'relative',
});

const SearchPaper = styled(m.div)({
  position: 'absolute',
  minHeight: '100%',
  width: '100%',
  overflow: 'auto',
});