'use client';

import type { User } from '@auth0/nextjs-auth0/types';
import useSWR from 'swr';

export function useProfile() {
  const {
    data,
    error,
    isLoading,
    mutate
  } = useSWR('/auth/profile', (...args) => fetch(...args).then((res) => {
    if (res.status === 204 || res.status === 401) {
      return null;
    }

    if (!res.ok) {
      throw new Error('Unauthorized');
    }

    return res.json() as Promise<User>;
  }));

  return {
    profile: error ? null : data,
    isLoading,
    error,
    invalidate: () => mutate()
  };
}
