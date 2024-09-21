import { putMarker, removeMarker } from '@/state/markers/actions';
import type { MarkersState } from '@/state/markers/types';
import { createReducer } from '@reduxjs/toolkit';

// Reducer
const initialState: MarkersState = {
  byId: {},
  allIds: [],
};

export const markersReducer = createReducer(initialState, (builder) => builder
  .addCase(putMarker, (state, { payload }) => {
    state.byId[payload.id] = payload.marker;

    if (!state.allIds.includes(payload.id)) {
      state.allIds.push(payload.id);
    }
  })
  .addCase(removeMarker, (state, { payload }) => {
    delete state.byId[payload.id];
  })
);
