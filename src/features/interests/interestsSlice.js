import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = '3d-bharat-interests';

const readStoredInterests = () => {
  if (typeof window === 'undefined') return [];
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState = {
  interests: readStoredInterests(),
  loading: false,
  error: null,
};

const interestsSlice = createSlice({
  name: 'interests',
  initialState,
  reducers: {
    toggleInterest: (state, action) => {
      const dealId = String(action.payload);
      const exists = state.interests.some((item) => String(item) === dealId);
      if (exists) {
        state.interests = state.interests.filter((item) => String(item) !== dealId);
      } else {
        state.interests = [...state.interests, dealId];
      }
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.interests));
      }
    },
    removeInterest: (state, action) => {
      const dealId = String(action.payload);
      state.interests = state.interests.filter((item) => String(item) !== dealId);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.interests));
      }
    },
    hydrateInterests: (state) => {
      state.interests = readStoredInterests();
    },
  },
});

export const { toggleInterest, removeInterest, hydrateInterests } = interestsSlice.actions;
export default interestsSlice.reducer;
