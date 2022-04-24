import { configureStore } from '@reduxjs/toolkit';
import reducer from './BrandSlice';

export const brandStore = configureStore({
  reducer,
});
