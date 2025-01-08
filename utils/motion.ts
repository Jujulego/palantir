export function stopAll(...animations: { stop: () => void }[]): () => void {
  return () => animations.forEach((a) => a.stop());
}
