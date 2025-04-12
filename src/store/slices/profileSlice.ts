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
  name: 'Shivam',
  email: 'ssaraffa786@gmail.com',
  phone: '+91 9801966700',
  address: {
    street: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  },
  interests: ['Coding, Singing'],
  profilePicture: 'https://png.pngtree.com/png-vector/20220319/ourmid/pngtree-account-icon-profiles-and-users-vector-info-silhouette-vector-png-image_44982146.jpg',
  bio: 'Hi, I am Shivam, a full stack developer.',
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/shivam-kumar-saraffa-66167a1b8/',
    github: 'https://github.com/saraffa13',
    twitter: 'https://x.com/shivam13537194',
  },
  education: 'Nit Hamirpur',
  occupation: 'Full Stack Developer',
  skills: ['Reactjs, Nodejs, Mongodb'],
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