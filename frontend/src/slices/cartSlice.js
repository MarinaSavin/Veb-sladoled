import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const cartFromStorage = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : null;

const initialState = cartFromStorage || {
  cartItems: [],
  itemsPrice: '0.00',
  shippingPrice: '0.00',
  taxPrice: '0.00',
  totalPrice: '0.00',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((cartItem) => cartItem._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem._id === existItem._id ? item : cartItem,
        );
      } else {
        state.cartItems.push(item);
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
      return updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
