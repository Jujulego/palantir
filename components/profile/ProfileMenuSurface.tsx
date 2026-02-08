'use client';

import clsx from 'clsx';
import { m } from 'motion/react';
import type { ReactNode } from 'react';

export interface ProfileMenuSurfaceProps {
  readonly isOpen: boolean;
  readonly fullHeight: number;

  readonly className?: string;
  readonly children?: ReactNode;
}

export default function ProfileMenuSurface({ isOpen, fullHeight, className, children }: ProfileMenuSurfaceProps) {
  return (
    <m.div
      className={clsx('relative rounded-(-k-ProfileMenuSurface-shape) h-12 w-12 z-20', className)}
      initial={{ '--ProfileMenuSurface-shape': '24px' }}
      animate={{ '--ProfileMenuSurface-shape': isOpen ? '16px' : '24px' }}
      data-open={isOpen}
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
