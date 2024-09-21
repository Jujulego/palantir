import { type Deferrable, type Observable, observable$, off$, resource$, type Subscribable } from 'kyrielle';

export interface Combinable<D> extends Deferrable<D>, Subscribable<D> {}
export interface Combined<D> extends Deferrable<D[]>, Observable<D[]> {}

export function combineLatest$<D>(observables: readonly Combinable<D>[]): Combined<D> {
  return resource$()
    .add({ defer: (signal) => observables.map((obs) => obs.defer(signal)) })
    .add(observable$<D[]>((emit, signal) => {
      const values = observables.map((obs) => obs.defer(signal));
      emit.next(values);

      const off = off$(...observables.map((obs, idx) => obs.subscribe({
        next: (val: D) => {
          values[idx] = val;
          emit.next(values);
        }
      })));

      signal.addEventListener('abort', () => off.unsubscribe(), { once: true });
    }))
    .build()
}
