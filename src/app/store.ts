// external imports
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer,FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,} from "redux-persist";

// internal imports
import storage from "./sync-storage";
import themReducer from './slices/theme/ThemeSlice'

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["theme"],
}; 

const rootReducer = combineReducers({
  theme:themReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }) 


});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
