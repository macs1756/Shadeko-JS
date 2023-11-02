import { createSlice } from '@reduxjs/toolkit';

export const languageSlice = createSlice({
  name: 'language',
  initialState: {
    language: {
		route: '',
		language: 'en',
	 }
  },
  reducers: {


    changeLanguage: (state, action) => {

      state.language.route = action.payload.route;
      state.language.language = action.payload.language;

    }


  }
});

export const { changeLanguage } = languageSlice.actions;

export default languageSlice.reducer;
