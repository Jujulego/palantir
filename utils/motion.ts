export function cancelAll(...animations: { cancel: () => void }[]): () => void {
  return () => animations.forEach((a) => a.cancel());
}
