import { createSlice } from '@reduxjs/toolkit'

export const promoSlice = createSlice({
  name: 'promocode',
  initialState: {
    promocode: []
  },

  reducers: {

    addPromocode: (state,action) => {

			state.promocode = [];
			state.promocode.push(action.payload);
			
    },

    resetPromocode: (state) =>{
      state.promocode = [];
    }
    

  }
});


// Action creators are generated for each case reducer function
export const { addPromocode, resetPromocode } = promoSlice.actions

export default promoSlice.reducer