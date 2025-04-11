import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  name: string;
  interests: string[];
  profilePicture: string;
}

const initialState: ProfileState = {
  name: '',
  interests: [],
  profilePicture: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<ProfileState>>) => {
      return { ...state, ...action.payload };
    },
    updateInterests: (state, action: PayloadAction<string[]>) => {
      state.interests = action.payload;
    },
  },
});

export const { updateProfile, updateInterests } = profileSlice.actions;
export default profileSlice.reducer;