import { configureStore } from '@reduxjs/toolkit';
import dealsReducer from './deals/dealsSlice';
import interestsReducer from './interests/interestsSlice';
import investorsReducer from './investors/investorsSlice';

export const store = configureStore({
  reducer: {
    deals: dealsReducer,
    interests: interestsReducer,
    investors: investorsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
