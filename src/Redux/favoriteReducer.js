import { createSlice } from '@reduxjs/toolkit';

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    favorite: []
  },
  reducers: {
    addToFavorite: (state, action) => {
      const itemIndex = state.favorite.findIndex(item => item.id === action.payload.id);

      if (itemIndex !== -1) {
        state.favorite.splice(itemIndex, 1);
      } else {
        state.favorite.push(action.payload);
      }
    }
  }
});

export const { addToFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
