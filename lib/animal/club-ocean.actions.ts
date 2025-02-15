'use server';

import { scrapAnimalTracking } from '@/lib/animal/club-ocean';

export async function actScrapAnimalTracking(name: string) {
  return await scrapAnimalTracking(name);
}
