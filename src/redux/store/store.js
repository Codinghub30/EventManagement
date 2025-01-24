import { configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";
import loaderReducer from "../slice/LoaderSlice";
import locationReducer from "../slice/locationSlice";
import {
  persistedCartReducer,
  persistedAuthReducer,
  persistedDateReducer, // Use persistedDateReducer
} from "../persists/persistsReducer";

const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    loader: loaderReducer,
    auth: persistedAuthReducer,
    location: locationReducer,
    date: persistedDateReducer, // Use the correct reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
