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
import { bookingApi } from "./apiSlice/bookingApiSlice";

import authSliceReducer from './slices/auth/authSlice'
import toastReducer from './slices/ToastSlice'
import roomSearchReducer from './slices/roomSearch/RoomSearch'
import favoritesReducer from './slices/favorites/Favorites'
import bookingPendingReducer from './slices/BookingPending'

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["theme","auth","favorites"],
}; 
const roomSearchPersistConfig = { key: 'room', version: 1, storage:storageSession };
const bookingPendingDataPersistConfig = { key: 'bookingPending', version: 1, storage:storageSession };

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [roomApi.reducerPath]: roomApi.reducer,
  [reviewApi.reducerPath]: reviewApi.reducer,
  [likeApi.reducerPath]: likeApi.reducer,
  [bookingApi.reducerPath]: bookingApi.reducer,
  theme:themReducer,
  roomSearch:persistReducer(roomSearchPersistConfig,roomSearchReducer),
  auth:authSliceReducer,
  ToastData:toastReducer,
  favorites:favoritesReducer,
  bookingPendingData:persistReducer(bookingPendingDataPersistConfig,bookingPendingReducer),

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
      .concat(bookingApi.middleware)

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
