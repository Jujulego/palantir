export function* count$(start: number, end: number): Generator<number> {
  let idx = start;

  while (idx < end) {
    yield idx++;
  }
}