import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useSearchParam(name: string) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const setSearchParam = useCallback((value: string | null) => {
    const url = new URL(window.location.href);
    
    if (value) {
      url.searchParams.set(name, value);
    } else {
      url.searchParams.delete(name);
    }
    
    router.replace(url.toString());
  }, [name, router]);
  
  return [searchParams.get(name), setSearchParam] as const;
}