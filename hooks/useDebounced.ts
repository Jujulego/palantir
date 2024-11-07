import { useState } from 'react';
import { useDebounce } from 'react-use';

export function useDebounced<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState<T>(value);
  useDebounce(() => setDebounced(value), delay, [value]);

  return debounced;
}