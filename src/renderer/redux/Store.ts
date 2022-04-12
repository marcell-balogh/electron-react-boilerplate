import { createStore } from '@reduxjs/toolkit';
import { BrandModel } from '../models/BrandModel';

export interface Store {
  directoryPath: string;
  brands: BrandModel[];
}

function brandStore(
  state: Store = {
    directoryPath: '',
    brands: [],
  },
  action: any
) {
  switch (action.type) {
    case 'ADD_BRAND':
      return {
        ...state,
        brands: [...state.brands, action.payload],
      };
    case 'REMOVE_BRAND':
      return {
        ...state,
        brands: state.brands.filter(
          (brand: BrandModel) => brand.id !== action.payload
        ),
      };
    case 'UPDATE_BRAND':
      return {
        ...state,
        brands: state.brands.map((brand: BrandModel) =>
          brand.id === action.payload.id ? action.payload : brand
        ),
      };
    case 'SET_BRANDS':
      return {
        ...state,
        brands: action.payload,
      };
    case 'SET_PATH':
      return {
        ...state,
        directoryPath: action.payload,
      };
    default:
      return state;
  }
}

export const store = createStore(brandStore, {
  directoryPath: '',
  brands: [],
} as Store);
