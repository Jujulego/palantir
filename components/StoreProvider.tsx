'use client';

import { type AppStore, makeStore } from '@/state/store';
import { type ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';

// Component
export interface StoreProviderProps {
  readonly children: ReactNode;
}

export default function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{ children }</Provider>;
}