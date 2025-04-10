import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/slice1';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    
  },
});

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;