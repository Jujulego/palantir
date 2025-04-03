'use client';

import { animate } from 'motion';
import { m, useMotionValue, useTransform } from 'motion/react';
import { useEffect } from 'react';

// Component
export interface InflateProps {
  readonly value: number;
}

export default function Inflate(props: InflateProps) {
  const value = useMotionValue(0);
  const rounded = useTransform(value, Math.round);

  useEffect(() => {
    const controls = animate(value, props.value, { duration: 0.5 });
    return () => controls.stop();
  }, [props.value, value]);

  return <m.span>{ rounded }</m.span>;
}