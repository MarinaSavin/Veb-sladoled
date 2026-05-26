import { createSlice } from '@reduxjs/toolkit';
import products from '../products';

const initialState = {
  products,
};

const adminProductsSlice = createSlice({
  name: 'adminProducts',
  initialState,
  reducers: {
    createProduct: (state, action) => {
      const nextId =
        Math.max(...state.products.map((product) => Number(product._id) || 0), 0) + 1;

      state.products.push({
        _id: nextId.toString(),
        ...action.payload,
        rating: 0,
        numReviews: 0,
      });
    },
    updateProduct: (state, action) => {
      state.products = state.products.map((product) =>
        product._id === action.payload._id ? action.payload : product,
      );
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((product) => product._id !== action.payload);
    },
  },
});

export const { createProduct, updateProduct, deleteProduct } = adminProductsSlice.actions;

export default adminProductsSlice.reducer;
