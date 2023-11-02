import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    login: []
  },
  reducers: {

    logIn: (state, action) => {
			state.login = [];
     		state.login.push(action.payload);
    },

	 logOut: (state, action) => {
		state.login = [];
	 }

  }
});

export const { logIn, logOut } = loginSlice.actions;

export default loginSlice.reducer;
