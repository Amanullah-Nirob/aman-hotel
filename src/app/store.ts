// external imports
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer,FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,} from "redux-persist";

// internal imports
import storage from "./sync-storage";
import themReducer from './slices/theme/ThemeSlice'
import { userApi } from "./apiSlice/useApiSlice";
import { roomApi } from "./apiSlice/roomApiSlice";
import authSliceReducer from './slices/auth/authSlice'
import toastReducer from './slices/ToastSlice'

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["theme"],
}; 

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [roomApi.reducerPath]: roomApi.reducer,
  theme:themReducer,
  auth:authSliceReducer,
  ToastData:toastReducer,

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }) 
      .concat(userApi.middleware)
      .concat(roomApi.middleware)

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
