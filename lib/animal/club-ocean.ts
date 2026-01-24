import type { Coordinates } from '@/lib/utils/coordinates';
import { FetchError } from '@/lib/utils/fetch';
import type { Writable } from '@/lib/utils/types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { cacheTag } from 'next/cache';

dayjs.extend(utc);

// Types
export interface ClubOceanAnimal {
  readonly name: string;
  readonly species?: string;
  readonly gender?: string;
  readonly size?: string;
  readonly coordinates: readonly ClubOceanCoordinates[];
}

export interface ClubOceanCoordinates extends Coordinates {
  readonly date: string;
}

// Constants
const ATTRIBUTES_REGEX = /<p class="m-0">(\S+) : ([^<]+)<\/p>/g;
const COORDINATES_REGEX = /\['([^']+)', (-?[0-9.]+), (-?[0-9.]+)],/g;

// Utils
async function loadAnimalTrackingPage(name: string): Promise<string | null> {
  console.log(`[animal] loading ${name} tracking page`);
  const res = await fetch(`https://tracking.clubocean.org/animal/${encodeURIComponent(name)}`, {
    next: {
      revalidate: 86400,
      tags: [`animal-${name}`]
    }
  });

  if (!res.ok) {
    if (res.status === 404) {
      console.warn(`[animal] ${name} tracking page not found`);
      return null;
    }

    throw new FetchError(res.status, await res.text());
  }

  console.log(`[animal] ${name} tracking page loaded`);
  return await res.text();
}

export async function scrapAnimalTracking(name: string): Promise<ClubOceanAnimal | null> {
  const raw = await loadAnimalTrackingPage(name);

  if (!raw) {
    return null;
  }

  const animal: Writable<ClubOceanAnimal> = {
    name,
    coordinates: []
  };

  // Load attributes
  for (const match of raw.matchAll(ATTRIBUTES_REGEX)) {
    const name = match[1].trim();
    const value = match[2].trim();

    switch (name) {
      case 'Espèce':
        animal.species = value;
        break;

      case 'Genre':
        animal.gender = value;
        break;

      case 'Taille':
        animal.size = value;
        break;
    }
  }

  // Load coordinates
  const coordinates: ClubOceanCoordinates[] = [];

  for (const match of raw.matchAll(COORDINATES_REGEX)) {
    coordinates.push({
      date: dayjs.utc(match[1].trim()).toISOString(),
      latitude: parseFloat(match[2]),
      longitude: parseFloat(match[3]),
    });
  }

  animal.coordinates = coordinates;

  return animal;
}
