'use client';

import clsx from 'clsx';
import { m } from 'motion/react';
import { type ReactNode, useEffect, useRef } from 'react';

export interface ProfileMenuSurfaceProps {
  readonly isOpen: boolean;
  readonly fullHeight: number;
  readonly onClose: () => void;

  readonly className?: string;
  readonly children?: ReactNode;
}

export default function ProfileMenuSurface({ isOpen, fullHeight, onClose, className, children }: ProfileMenuSurfaceProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (e: PointerEvent) => {
      const surface = ref.current;

      if (!surface || surface.contains(e.target as Node)) {
        return;
      }

      if (surface.getAttribute('data-open') === 'true') {
        onClose();
      }
    };

    window.addEventListener('click', listener);

    return () => {
      window.removeEventListener('click', listener);
    };
  }, [onClose]);

  return (
    <m.div
      ref={ref}
      className={clsx('relative group rounded-(--ProfileMenuSurface-shape) h-12 w-12 z-20', className)}
      data-open={isOpen || null}
      initial={{ '--ProfileMenuSurface-shape': '24px' }}
      animate={{ '--ProfileMenuSurface-shape': isOpen ? '16px' : '24px' }}
    >
      <m.div
        className="absolute top-0 right-0 min-h-12 overflow-hidden rounded-(--ProfileMenuSurface-shape) elevation-2 bg-background-paper"
        initial={{ height: 48, width: 48 }}
        animate={{
          height: isOpen ? fullHeight : 48,
          width: isOpen ? 320 : 48,
        }}
      >
        { children }
      </m.div>
    </m.div>
  );
}
