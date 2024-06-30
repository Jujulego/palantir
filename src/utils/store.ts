import { StoredResource, waitFor$ } from 'kyrielle';
import { useCallback, useSyncExternalStore } from 'react';

// Hook
export interface UseStoreOptions {
  suspense?: boolean;
}

export function useStore$<D>(res: StoredResource<D>): D;
export function useStore$<D>(res: StoredResource<D>, options: { suspense?: true }): D;
export function useStore$<D>(res: StoredResource<D>, options: { suspense: false }): D | undefined;
export function useStore$<D>(res: StoredResource<D>, options: UseStoreOptions): D | undefined;

export function useStore$<D>(res: StoredResource<D>, options: UseStoreOptions = {}): D | undefined {
  const data = useSyncExternalStore(
    useCallback((cb) => {
      const sub = res.subscribe(cb);
      return () => sub.unsubscribe();
    }, [res]),
    () => res.defer(),
    () => undefined,
  );

  if (data === undefined && options.suspense !== false) {
    // TODO: use "use" once React 19 is out
    throw waitFor$(res);
  }

  return data;
}
