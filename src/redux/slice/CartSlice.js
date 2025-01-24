import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cartData")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },

    quantityIncrement: (state, action) => {
      console.log("State of cart before increment:", state.cart); // Debugging current cart state
      console.log("Payload received for increment:", action.payload);

      const item = state.cart.find((item) => item._id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    quantityDecrement: (state, action) => {
      const item = state.cart.find((item) => item._id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cart = state.cart.filter((item) => item._id !== action.payload);
        }
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },

    clearCart(state) {
      state.cart = [];
      localStorage.setItem("cartData", JSON.stringify(state.cart));
    },
  },
});

// state.cart = state.cart.filter((item) => item._id !== action.payload);
export const {
  addToCart,
  quantityIncrement,
  quantityDecrement,
  removeFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
