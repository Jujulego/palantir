import type { MarkerState } from '@/state/markers/types';
import { createAction } from '@reduxjs/toolkit';

// Actions
export const putMarker = createAction<{ id: string, marker: MarkerState }>('markers/putMarker');
export const removeMarker = createAction<{ id: string }>('markers/removeMarker');
