'use client';

import Image, { type ImageProps } from 'next/image';
import { useEffect, useRef, useState } from 'react';

// Component
export default function ColoredImage({ style = {}, ...rest }: ImageProps) {
  const img = useRef<HTMLImageElement>(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!img.current) return;

    const observer = new ResizeObserver((entries) => {
      setHeight(entries[0].target.clientHeight);
      setWidth(entries[0].target.clientWidth);
    });

    observer.observe(img.current);

    return () => observer.disconnect();
  }, []);

  // Render
  return (
    <div className="overflow-hidden" style={{ ...style, height: height || 'auto', width: width || 'auto' }}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        {...rest}
        ref={img}
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
