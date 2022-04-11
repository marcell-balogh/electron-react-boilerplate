// import { createSlice } from '@reduxjs/toolkit';
// import { BrandModel } from '../models/BrandModel';
//
// const initialState: BrandModel[] = [];
//
// export const brandSlice = createSlice({
//   name: 'brands',
//   initialState,
//   reducers: {
//     add: (state, action) => {
//       state.push(action.payload);
//     },
//     remove: (state, action) => {
//       state.splice(action.payload, 1);
//     },
//     update: (state, action) => {
//       state[action.payload.index] = action.payload.brand;
//     },
//     set: (state, action) => {
//       state.concat(action.payload);
//     },
//   },
// });
//
// export const { add, remove, update, set } = brandSlice.actions;
//
// export const selectBrands = (state: BrandModel[]) => state;
//
// export default brandSlice.reducer;
