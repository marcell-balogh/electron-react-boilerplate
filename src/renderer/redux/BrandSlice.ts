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
      const newBrand: BrandModel = action.payload;
      newBrand.json = {
        default: {
          ...newBrand.json.default,
          clubId: newBrand.id,
          theme: {
            scheme: newBrand.scheme,
            primary: newBrand.primaryColor,
            secondary: newBrand.secondaryColor,
          },
          features: {
            ...newBrand.features,
          },
        },
      };
      createBrand(state.directoryPath, action.payload);
      newBrand.logoPath = `${state.directoryPath}\\${action.payload.name}\\icon.png`;
      state.brands.push(newBrand);
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
        logoPath: `${state.directoryPath}\\${action.payload.newBrand.name}\\icon.png`,
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
