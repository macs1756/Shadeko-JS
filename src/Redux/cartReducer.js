import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: []
  },

  reducers: {

    addToCart: (state, action) => {
      const itemIndex = state.products.findIndex((item) => item.id === action.payload.id);
    
      if (itemIndex !== -1) {
        // Якщо item існує, оновлюємо quantity та інші поля з action.payload
        state.products[itemIndex] = {
          ...state.products[itemIndex],
          ...action.payload,
          quantity: (+state.products[itemIndex].quantity) + (+action.payload.quantity),
        };
      } else {
        // Якщо item не існує, просто додаємо action.payload до масиву
        state.products.push(action.payload);
      }
    },
    
    


    removeItem: (state,action) => {
      state.products=state.products.filter(item=>item.id !== action.payload)
    },


    replaceItem: (state, action) => {
      const { id, quantity } = action.payload;

      const item = state.products.find((item) => item.id == id);

      if (item) {
        item.quantity = quantity;
      }
    },

    resetCart: (state) => {
      state.products = [];
    }

  }
});


// Action creators are generated for each case reducer function
export const { addToCart, removeItem, replaceItem, resetCart  } = cartSlice.actions

export default cartSlice.reducer