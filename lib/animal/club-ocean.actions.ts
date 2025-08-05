'use server';

import { scrapAnimalTracking } from '@/lib/animal/club-ocean';
import { ANIMAL_NAME_REGEX } from '@/lib/animal/constants';

export async function actScrapAnimalTracking(name: string) {
  if (!ANIMAL_NAME_REGEX.test(name)) {
    return null;
  }

  return await scrapAnimalTracking(name);
}
