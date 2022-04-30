import { createSlice } from '@reduxjs/toolkit';
import {
  createBrand,
  saveBrand,
  getTemplateJson,
} from 'renderer/services/BrandService';
import { BrandModel } from '../models/BrandModel';

export interface Store {
  directoryPath: string;
  brands: BrandModel[];
  templateJson: any;
}

const initialState: Store = {
  directoryPath: '',
  brands: [],
  templateJson: {},
};

export const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    addBrand(state, action) {
      createBrand(state.directoryPath, action.payload);
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
      const index = state.brands.findIndex(
        (brand) => brand.id === action.payload.oldBrand.id
      );
      state.brands[index] = newBrand;
    },
    setBrands(state, action) {
      state.brands = action.payload;
    },
    setPath(state, action) {
      state.directoryPath = action.payload;
    },
    setTemplateJson(state) {
      state.templateJson = getTemplateJson();
      console.warn('json set', state.templateJson);
    },
  },
});

export const {
  addBrand,
  removeBrand,
  updateBrand,
  setBrands,
  setPath,
  setTemplateJson,
} = brandSlice.actions;

export const selectBrands = (store: Store) => store.brands;

export default brandSlice.reducer;
