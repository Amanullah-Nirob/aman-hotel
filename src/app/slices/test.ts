import { createSlice, PayloadAction } from "@reduxjs/toolkit";


import type { RootState } from "../store"; 



const testSlice = createSlice({
  name: "test",
  initialState: {
    testBox: []
  },
  reducers: {
    setTestBox: (state, action) => {
        state.testBox = action.payload;
    },
  },
});

export const { setTestBox } = testSlice.actions;

export default testSlice.reducer;

export const selectTestBox = (state: RootState) => state.test?.testBox;
