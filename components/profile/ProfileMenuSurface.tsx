'use client';

import clsx from 'clsx';
import { m } from 'motion/react';
import type { ReactNode } from 'react';

export interface ProfileMenuSurfaceProps {
  readonly isOpen: boolean;

  readonly className?: string;
  readonly children?: ReactNode;
}

export default function ProfileMenuSurface({ isOpen, className, children }: ProfileMenuSurfaceProps) {
  return (
    <m.div
      className={clsx('relative rounded-(--ProfileMenuSurface-shape) h-12 w-12', className)}
      initial={{ '--ProfileMenuSurface-shape': '24px' }}
      animate={{ '--ProfileMenuSurface-shape': isOpen ? '16px' : '24px' }}
    >
      <m.div
        className="absolute top-0 right-0 min-h-12 overflow-auto rounded-(--ProfileMenuSurface-shape) elevation-2 bg-background-paper"
        initial={{ width: 48 }}
        animate={{ width: isOpen ? 320 : 48}}
      >
        { children }
      </m.div>
    </m.div>
  );
}
