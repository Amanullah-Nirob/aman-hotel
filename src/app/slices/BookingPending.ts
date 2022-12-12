import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store"; 

export const initialState:any = {
  bookingPendingData:{}
};

const bookingPendingData = createSlice({
  name: "bookingPendingData",
  initialState,
  reducers: {
    setBookingPendingData: (state, action) => {
        state.bookingPendingData= action.payload;
    },
  },
});

export const { setBookingPendingData } = bookingPendingData.actions;

export default bookingPendingData.reducer;

export const selectBookingPendingData = (state: RootState) => state.bookingPendingData?.bookingPendingData;
