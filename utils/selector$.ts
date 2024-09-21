import { Store } from '@reduxjs/toolkit';
import { map$, Observable, pipe$, Deferrable, resource$ } from 'kyrielle';

// Utils
export type Selected<D> = Deferrable<D> & Observable<D>;

export function selector$<S, D>(store: Store<S>, selector: (state: S) => D): Selected<D> {
  return pipe$(
    resource$<S>()
      .add(store)
      .add({ defer: () => store.getState() })
      .build(),
    map$(selector)
  ) as Deferrable<D> & Observable<D>;
}
