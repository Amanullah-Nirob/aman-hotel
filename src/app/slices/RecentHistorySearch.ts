import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store"; 

export const initialState:any = {
  recentHistorySearchData:[]
};

const recentHistorySearch = createSlice({
  name: "recentHistorySearch",
  initialState,
  reducers: {
    setRecentHistoryData: (state, action) => {
      const existItem=state.recentHistorySearchData.find((x:any)=>x._id===action.payload._id)
      if(!existItem){
         state.recentHistorySearchData.push(action.payload)
      }
    }, 
    removeRecentHistoryData(state, action) {
      state.recentHistorySearchData = state.recentHistorySearchData.filter((item:any) => item._id !== action.payload)
    },
    removeAllHistory(state, action) {
      state.recentHistorySearchData = []
    }
  },
});

export const { setRecentHistoryData,removeRecentHistoryData,removeAllHistory} = recentHistorySearch.actions;

export default recentHistorySearch.reducer;

export const selectRecentHistorySearch= (state: RootState) => state.recentHistorySearch?.recentHistorySearchData;
