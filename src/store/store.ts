import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/api';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Add the api reducer to the store
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware), // Add RTK Query middleware
});

export type RootState = ReturnType<typeof store.getState>; // Type for the RootState
export type AppDispatch = typeof store.dispatch; // Type for the dispatch function
