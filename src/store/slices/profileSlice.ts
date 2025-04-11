import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  interests: string[];
  profilePicture: string;
  bio: string;
  socialLinks: {
    linkedin: string;
    github: string;
    twitter: string;
  };
  education: string;
  occupation: string;
  skills: string[];
}

const initialState: ProfileState = {
  name: '',
  email: '',
  phone: '',
  address: {
    street: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  },
  interests: [],
  profilePicture: 'https://microbiology.ucr.edu/sites/default/files/styles/form_preview/public/blank-profile-pic.png?itok=4teBBoet',
  bio: '',
  socialLinks: {
    linkedin: '',
    github: '',
    twitter: '',
  },
  education: '',
  occupation: '',
  skills: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<ProfileState>>) => {
      return { ...state, ...action.payload };
    },
    updateAddress: (state, action: PayloadAction<Partial<ProfileState['address']>>) => {
      state.address = { ...state.address, ...action.payload };
    },
    updateSocialLinks: (state, action: PayloadAction<Partial<ProfileState['socialLinks']>>) => {
      state.socialLinks = { ...state.socialLinks, ...action.payload };
    },
    updateInterests: (state, action: PayloadAction<string[]>) => {
      state.interests = action.payload;
    },
    updateSkills: (state, action: PayloadAction<string[]>) => {
      state.skills = action.payload;
    },
    updateProfilePicture: (state, action: PayloadAction<string>) => {
      state.profilePicture = action.payload;
    },
  },
});

export const {
  updateProfile,
  updateAddress,
  updateSocialLinks,
  updateInterests,
  updateSkills,
  updateProfilePicture,
} = profileSlice.actions;

export default profileSlice.reducer;