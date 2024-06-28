import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
            token: null,
            myCourses: [],
            cart: [],  
            affiliateToken: null, 
    };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      if (state === null) {
        state = { token: null, myCourses: [], cart: [] };
      }
      state.token = action.payload.token;
    },
    
    logout: (state) => {
      if (state !== null) {
         state.token = null;
         state.myCourses = [];
         state.cart = [];
         state.affiliateToken = [];
      }
    },

    setMyCourses: (state, action) => {
      state.myCourses = action.payload;
    },


    addToCart: (state, action) => {
      const existingItem = state.cart.find(item => item._id === action.payload._id);
      if (existingItem) {
        console.log("Item already exists in the cart");
      } else {
        state.cart = [...state.cart, { ...action.payload, quantity: 1 }];
      }
    },

    removeFromCart: (state, action) => {
      const indexToRemove = state.cart.findIndex(item => item.id === action.payload);
      if (indexToRemove !== -1) {
        state.cart.splice(indexToRemove, 1);
      }
    },

    clearCart: (state) => {
      state.cart = [];
    },
    
    setAffiliateToken: (state, action) => {
      state.affiliateToken = action.payload;
    },

    
  },
});

export const { login, logout, setMyCourses, addToCart, removeFromCart,clearCart,setAffiliateToken } = userSlice.actions;

export default userSlice.reducer;

