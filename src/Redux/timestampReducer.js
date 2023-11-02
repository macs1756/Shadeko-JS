import { createSlice } from '@reduxjs/toolkit';

export const timestampSlice = createSlice({
  name: 'timestamp',
  initialState: {
    timestamp: []
  },
  reducers: {

    addTimestamp: (state, action) => {

        state.timestamp = [];
        state.timestamp.push(action.payload);
      
    }
  }
});

export const { addTimestamp } = timestampSlice.actions;

export default timestampSlice.reducer;