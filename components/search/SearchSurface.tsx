import { useFocusWithin } from '@/lib/utils/useFocusWithin';
import clsx from 'clsx';
import { m } from 'motion/react';
import { type KeyboardEvent, type ReactNode, useCallback } from 'react';

// Component
export interface SearchSurfaceProps {
  readonly isOpen: boolean;
  readonly onOpen: () => void;
  readonly onClose: () => void;

  readonly children?: ReactNode;
  readonly className?: string;
}

export default function SearchSurface({ isOpen, onOpen, onClose, children, className }: SearchSurfaceProps) {
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
    <m.div
      className={clsx('relative rounded-(--SearchSurface-shape)', className)}
      initial={{ '--SearchSurface-shape': borderRadius }}
      animate={{ '--SearchSurface-shape': borderRadius }}
    >
      <div
        {...focusProps}
        className="absolute w-full min-h-full overflow-auto rounded-(--SearchSurface-shape) elevation-2 bg-background-paper"
        onClick={onOpen}
        onTouchStart={onOpen}
        onKeyDown={handleKeyDown}
      >
        { children }
      </div>
    </m.div>
  );
}
