import { StoredResource, waitFor$ } from 'kyrielle';
import { use, useCallback, useSyncExternalStore } from 'react';

// Hook
export function useStore$<D>(res: StoredResource<D>, serverSnapshot?: () => D): D {
  const data = useSyncExternalStore(
    useCallback((cb) => {
      const sub = res.subscribe(cb);
      return () => sub.unsubscribe();
    }, [res]),
    () => res.defer(),
    serverSnapshot ?? (() => undefined),
  );

  if (data === undefined) {
    return use(waitFor$(res));
  }

  return data;
}
