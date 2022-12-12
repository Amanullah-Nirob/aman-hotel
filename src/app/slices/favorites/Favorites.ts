import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState:any = {
    favorites: []
}

export const favorites = createSlice({
  name: 'favorites', 
  initialState,
  reducers: {
    addFavorite(state, action) {
        state.favorites.push(action.payload)
    },
    removeFavorite(state, action) {
        state.favorites = state.favorites.filter((item:any) => item._id !== action.payload._id)
    }
  },
});

export const { addFavorite,removeFavorite } = favorites.actions;

export const selectFavorites = (state:any) => state.favorites.favorites;

export default favorites.reducer;
