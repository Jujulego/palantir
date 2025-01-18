import { FetchError } from '@/utils/fetch';

export async function rawAnimalTracking(name: string): Promise<string> {
  const res = await fetch(`https://tracking.clubocean.org/animal/${name}`, {
    next: {
      revalidate: 86400,
      tags: [`animal-${name}`]
    }
  });

  if (!res.ok) {
    throw new FetchError(res.status, await res.text());
  }

  return await res.text();
}
