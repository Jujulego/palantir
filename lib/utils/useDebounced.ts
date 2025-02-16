import { useEffect, useState } from 'react';

export function useDebounced<V>(value: V, ms?: number): V {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  
  return debounced;
}

export interface DebouncedOpts {
  readonly ms?: number;
}
