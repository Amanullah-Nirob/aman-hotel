import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../../store"; 

// initialState url
const oneDayMs = 86000000;
export const initialState = {
  roomSearchQuery:{
    arrivalDate: Date.now(),
    departureDate: Date.now() + oneDayMs,
    adults: 1,
    children: 0,
    babies: 0,
    price: [0, 15000],
    hasConditioner: false,
    hasWifi: false,
    hasWashingMachine: false,
    hasKitchen: false,
    hasWorkSpace: false,
    guestAllow: false,
    smokingAllow: false,
    animalAllow: false,
    standard: false,
    moderate: false,
    deluxe: false,
    suite: false,
  }
};


const roomSearchSlice = createSlice({
  name: "roomSearch",
  initialState,
  reducers: {
    setRoomSearchQuery: (state, action) => {
        state.roomSearchQuery= action.payload;
    },
  },
});

export const { setRoomSearchQuery } = roomSearchSlice.actions;

export default roomSearchSlice.reducer;

export const selectRoomSearchQuery = (state: RootState) => state.roomSearch?.roomSearchQuery;
