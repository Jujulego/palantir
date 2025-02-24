export type AllOrNothing<T> = T | Partial<Record<keyof T, undefined>>;
export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
