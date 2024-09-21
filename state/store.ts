import { markersReducer } from '@/state/markers/reducer';
import { configureStore } from '@reduxjs/toolkit';

// Store builder
export function makeStore() {
  return configureStore({
    reducer: {
      markers: markersReducer,
    }
  });
}

// Types
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
