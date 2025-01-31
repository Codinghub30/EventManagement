import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";
import authReducer from "../slice/authSlice";
import cartReducer from "../slice/CartSlice";
import dateReducer from "../slice/dateSlice";

const authPersistConfig = {
  key: "auth",
  storage: sessionStorage,
};

const cartPersistConfig = {
  key: "cart",
  storage,
};

const datePersistConfig = {
  key: "date",
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
export const persistedDateReducer = persistReducer(
  datePersistConfig,
  dateReducer
);
