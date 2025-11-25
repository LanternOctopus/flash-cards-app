export function shuffle<T>(list: T[]): T[] {
  return list
    .map(x => ({ x, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map(o => o.x);
}