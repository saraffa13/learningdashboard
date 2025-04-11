import { configureStore } from '@reduxjs/toolkit';
import profileSlice from '../store/slices/profileSlice'
import contentSlice from '../store/slices/contentSlice'
import assessmentSlice from '../store/slices/assessmentSlice'
import notificationSlice from '../store/slices/notificationSlice'

export const store = configureStore({
  reducer: {
    profile: profileSlice,
    content: contentSlice,
    assessment: assessmentSlice,
    notifications: notificationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;