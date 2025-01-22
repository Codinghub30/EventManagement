import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../slice/authSlice";
import cartReducer from "../slice/CartSlice";
import loaderReducer from "../slice/LoaderSlice";

// Persist configurations
const authPersistConfig = {
  key: "auth",
  storage,
};

const cartPersistConfig = {
  key: "cart",
  storage,
};

// Persisted reducers
export const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authReducer
);
export const persistedCartReducer = persistReducer(
  cartPersistConfig,
  cartReducer
);
