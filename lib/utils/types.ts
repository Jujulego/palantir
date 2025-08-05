export type AllOrNothing<T> = T | Partial<Record<keyof T, undefined>>;
export type Writable<T> = { -readonly [P in keyof T]: T[P] };
