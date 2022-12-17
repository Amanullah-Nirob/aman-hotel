import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse } from "../../interface/userinterface";

import type { RootState } from "../../store"; 

const initialState:any = {
  loggedInUser: null
}


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
        state.loggedInUser = action.payload;
    },
  },
});

export const { setLoggedInUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth?.loggedInUser;
