import { useFocusWithin } from '@/lib/utils/useFocusWithin';
import Paper from '@mui/material/Paper';
import { styled, type SxProps, type Theme } from '@mui/material/styles';
import { m } from 'motion/react';
import { type KeyboardEvent, type ReactNode, useCallback } from 'react';

// Component
export interface SearchSurfaceProps {
  readonly isOpen: boolean;
  readonly onOpen: () => void;
  readonly onClose: () => void;

  readonly children?: ReactNode;
  readonly sx?: SxProps<Theme>;
}

export default function SearchSurface({ isOpen, onOpen, onClose, children, sx }: SearchSurfaceProps) {
  // Track focus
  const focusProps = useFocusWithin({
    onFocus: onOpen,
    onBlur: onClose,
  });

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // Render
  const borderRadius = isOpen ? '16px' : '24px';

  return (
    <SearchPlaceholder
      initial={{ '--SearchSurface-shape': borderRadius }}
      animate={{ '--SearchSurface-shape': borderRadius }}
      sx={sx}
    >
      <Paper
        {...focusProps}
        onClick={onOpen}
        onTouchStart={onOpen}
        onKeyDown={handleKeyDown}

        elevation={2}
        sx={{
          position: 'absolute',
          minHeight: '100%',
          width: '100%',
          overflow: 'auto',

          borderRadius: 'var(--SearchSurface-shape)'
        }}
      >
        { children }
      </Paper>
    </SearchPlaceholder>
  );
}

// Elements
const SearchPlaceholder = styled(m.div)({
  position: 'relative',

  borderRadius: 'var(--SearchSurface-shape)',
});
