import { configureStore } from '@reduxjs/toolkit';
import brandReducer from './BrandSlice';

export const brandStore = configureStore({
  reducer: {
    brands: brandReducer,
  },
});
