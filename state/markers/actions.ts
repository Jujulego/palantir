import { createAction } from '@reduxjs/toolkit';
import type { Marker } from 'mapbox-gl';

// Actions
export const addMarker = createAction<{ id: string, marker: Marker }>('markers/addMarker');
export const removeMarker = createAction<{ id: string }>('markers/removeMarker');