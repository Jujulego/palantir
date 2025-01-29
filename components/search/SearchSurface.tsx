import Paper from '@mui/material/Paper';
import { styled, type SxProps, type Theme } from '@mui/material/styles';
import { useOverlay } from '@react-aria/overlays';
import { m } from 'motion/react';
import { type ReactNode, type RefObject, useRef } from 'react';

// Component
export interface SearchSurfaceProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;

  readonly paperRef?: RefObject<HTMLDivElement | null>;

  readonly children?: ReactNode;
  readonly sx?: SxProps<Theme>;
}

export default function SearchSurface(props: SearchSurfaceProps) {
  const _paperRef = useRef<HTMLDivElement>(null);
  const { isOpen, onClose, paperRef = _paperRef, children, sx } = props;

  // Overlay state
  const { overlayProps } = useOverlay({
    isOpen,
    onClose,
    shouldCloseOnBlur: true,
    isDismissable: false,
  }, paperRef);

  // Render
  const borderRadius = isOpen ? 16 : 24;

  return (
    <SearchPlaceholder
      initial={{ borderRadius }}
      animate={{ borderRadius }}
      sx={sx}
    >
      <SearchPaper
        ref={paperRef} {...(overlayProps as object)}
        initial={{ borderRadius }}
        animate={{ borderRadius }}
        sx={sx}
      >
        {children}
      </SearchPaper>
    </SearchPlaceholder>
  );
}

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