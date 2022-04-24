import { createSlice } from '@reduxjs/toolkit';
import { BrandModel } from '../models/BrandModel';

export interface Store {
  directoryPath: string;
  brands: BrandModel[];
}

const initialState: Store = {
  directoryPath: '',
  brands: [],
};

export const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    addBrand(state, action) {
      state.brands.push(action.payload);
    },
    removeBrand(state, action) {
      state.brands = state.brands.filter(
        (brand: BrandModel) => brand.id !== action.payload
      );
    },
    updateBrand(state, action) {
      const index = state.brands.indexOf(action.payload);
      state.brands[index] = action.payload;
    },
    setBrands(state, action) {
      state.brands = action.payload;
    },
    setPath(state, action) {
      state.directoryPath = action.payload;
    },
  },
});

export const { addBrand, removeBrand, updateBrand, setBrands, setPath } =
  brandSlice.actions;

export const selectBrands = (store: Store) => store.brands;

export default brandSlice.reducer;
