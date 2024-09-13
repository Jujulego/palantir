import { addMarker, removeMarker } from '@/state/markers/actions';
import type { MarkersState } from '@/state/markers/types';
import { createReducer } from '@reduxjs/toolkit';
import { castDraft } from 'immer';

// Reducer
const initialState: MarkersState = {
  byId: {},
};

export const markersReducer = createReducer(initialState, (builder) => builder
  .addCase(addMarker, (state, { payload }) => {
    state.byId[payload.id] = castDraft(payload.marker);
  })
  .addCase(removeMarker, (state, { payload }) => {
    delete state.byId[payload.id];
  })
);