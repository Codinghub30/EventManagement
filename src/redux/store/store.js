import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slice/CartSlice";
import authReducer from "../slice/authSlice";
import loaderReducer from "../slice/LoaderSlice";
import locationReducer from "../slice/locationSlice";
import persistStore from "redux-persist/es/persistStore";
import {
  persistedCartReducer,
  persistedAuthReducer,
} from "../persists/persistsReducer";
const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    loader: loaderReducer,
    auth: persistedAuthReducer,
    location: locationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
