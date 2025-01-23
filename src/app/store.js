import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Import reducers
import authReducer from "../features/auth/authSlice";
// import competitionReducer from "./reducers/competitionSlice";
// import trekkingReducer from "./reducers/trekkingSlice";
// import ridingReducer from "./reducers/ridingSlice";
// import fitnessReducer from "./reducers/fitnessSlice";
// import ecommerceReducer from "./reducers/ecommerceSlice";
// import profileReducer from "./reducers/profileSlice";
// import adminReducer from "./reducers/adminSlice";

// Configuration for persisting the state
const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "auth",
    // "profile",
    // "ecommerce",
    // "competition",
    // "trekking",
    // "riding",
    // "fitness",
  ],
};

// Combine reducers for different features
const rootReducer = combineReducers({
  auth: authReducer, // Handles login/signup state
  // competition: competitionReducer, // Competition-related states
  // trekking: trekkingReducer, // Trekking-related states
  // riding: ridingReducer, // Riding-related states
  // fitness: fitnessReducer, // Fitness-related states
  // ecommerce: ecommerceReducer, // Ecommerce-related states
  // profile: profileReducer, // User profile and edit profile
  // admin: adminReducer, // Admin controllers and operations
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store setup
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // To handle non-serializable data (e.g., persist)
    }),
});

// Persistor for persisting the store
const persistor = persistStore(store);

// Exports
export { store, persistor };
