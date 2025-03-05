import { useEffect, useState } from 'react';

/**
 * Returns a value debounced by the given time.
 * @param value
 * @param ms
 */
export function useDebounced<V>(value: V, ms?: number): V {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  
  return debounced;
}
