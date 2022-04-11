import { createStore } from '@reduxjs/toolkit';
import { BrandModel } from '../models/BrandModel';

function brands(state: BrandModel[] = [], action: any) {
  switch (action.type) {
    case 'ADD_BRAND':
      return [...state, action.payload];
    case 'REMOVE_BRAND':
      return state.filter((brand) => brand.id !== action.payload.id);
    case 'UPDATE_BRAND':
      return state.map((brand) => {
        if (brand.id === action.payload.id) {
          return action.payload;
        }
        return brand;
      });
    case 'SET_BRANDS':
      return action.payload;
    default:
      return state;
  }
}

export const brandStore = createStore(brands, []);
