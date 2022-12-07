// external imports
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer,FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,} from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session'

// internal imports
import storage from "./sync-storage";
import themReducer from './slices/theme/ThemeSlice'
import { userApi } from "./apiSlice/useApiSlice";
import { roomApi } from "./apiSlice/roomApiSlice";
import { reviewApi } from "./apiSlice/reviewApiSlice";
import { likeApi } from "./apiSlice/likeApiSlice";

import authSliceReducer from './slices/auth/authSlice'
import toastReducer from './slices/ToastSlice'
import roomSearchReducer from './slices/roomSearch/RoomSearch'

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["theme","auth"],
}; 
const roomSearchPersistConfig = { key: 'room', version: 1, storage:storageSession };

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [roomApi.reducerPath]: roomApi.reducer,
  [reviewApi.reducerPath]: reviewApi.reducer,
  [likeApi.reducerPath]: likeApi.reducer,
  theme:themReducer,
  roomSearch:persistReducer(roomSearchPersistConfig,roomSearchReducer),
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
      .concat(reviewApi.middleware)
      .concat(likeApi.middleware)

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
