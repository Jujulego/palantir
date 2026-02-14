import { type Ref, type RefCallback, useCallback, useEffect, useRef, useState } from 'react';

export interface UseResizeObserver<E extends Element = Element> {
  readonly ref: Ref<E>;
  readonly height: number;
  readonly width: number;
}

export function useResizeObserver<E extends Element = Element>(): UseResizeObserver<E> {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const observer = useRef<ResizeObserver>(null);

  if (observer.current === null) {
    observer.current = typeof window !== 'undefined'
      ? new ResizeObserver((entries) => {
        setSize({
          height: entries[0].target.clientHeight,
          width: entries[0].target.clientWidth,
        });
      })
      : null;
  }

  useEffect(() => {
    return () => {
      observer.current!.disconnect();
    };
  }, []);

  return {
    ref: useCallback<RefCallback<E>>((element) => {
      if (!element) return;

      observer.current!.observe(element);
      setSize({
        height: element.clientHeight,
        width: element.clientWidth,
      });

      return () => {
        observer.current!.unobserve(element);
      };
    }, []),
    ...size,
  };
}
