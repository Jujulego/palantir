'use server';

import type { Coordinates } from '@/lib/utils/coordinates';
import { FetchError } from '@/lib/utils/fetch';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

// Types
export interface ClubOceanAnimal {
  readonly name: string;
  readonly species?: string;
  readonly gender?: string;
  readonly size?: string;
  readonly coordinates: readonly ClubOceanTrackingCoordinates[];
}

export interface ClubOceanTrackingCoordinates extends Coordinates {
  readonly date: string;
}

// Constants
const ATTRIBUTES_REGEX = /<p class="m-0">(\S+) : ([^<]+)<\/p>/g;
const COORDINATES_REGEX = /\['([^']+)', (-?[0-9.]+), (-?[0-9.]+)],/g;

// Utils
export async function rawAnimalTracking(name: string): Promise<string | null> {
  const res = await fetch(`https://tracking.clubocean.org/animal/${name}`, {
    next: {
      revalidate: 86400,
      tags: [`animal-${name}`]
    }
  });

  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }

    throw new FetchError(res.status, await res.text());
  }

  return await res.text();
}

export async function fetchAnimalTracking(name: string): Promise<ClubOceanAnimal | null> {
  const raw = await rawAnimalTracking(name);

  if (!raw) {
    return null;
  }

  const animal: Writeable<ClubOceanAnimal> = {
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
  const coordinates: ClubOceanTrackingCoordinates[] = [];

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
