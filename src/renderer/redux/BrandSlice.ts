import { createSlice } from '@reduxjs/toolkit';
import { saveBrand } from 'renderer/services/BrandService';
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
      saveBrand(
        state.directoryPath,
        action.payload.newBrand,
        action.payload.oldBrand
      );
      const newBrand: BrandModel = {
        ...action.payload.newBrand,
        logoPath: action.payload.oldBrand.logoPath,
      };
      const index = state.brands.indexOf(action.payload.oldBrand);
      state.brands[index] = newBrand;
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
