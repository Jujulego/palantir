'use client';

import { useResizeObserver } from '@/lib/utils/useResizeObserver';
import Image, { type ImageProps } from 'next/image';

// Component
export default function ColoredImage({ style = {}, ...rest }: ImageProps) {
  const { ref: resizeRef, width, height } = useResizeObserver<HTMLImageElement>();

  // Render
  return (
    <div className="overflow-hidden" style={{ ...style, height: height || 'auto', width: width || 'auto' }}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        {...rest}
        ref={resizeRef}
        style={{
          color: 'unset',
          width: style.width,
          height: style.height,
          filter: `drop-shadow(currentcolor ${width}px 0px)`,
          transform: 'translate(-100%, 0)'
        }}
      />
    </div>
  );
}
