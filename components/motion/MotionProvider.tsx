'use client';

import { domAnimation, LazyMotion, MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';

export interface MotionProviderProps {
  readonly children: ReactNode;
}

export default function MotionProvider({ children }: MotionProviderProps) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.3 }}>
      <LazyMotion features={domAnimation} strict>
        { children }
      </LazyMotion>
    </MotionConfig>
  );
}
