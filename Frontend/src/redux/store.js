// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice"; // Path to your authSlice.js

const store = configureStore({
  reducer: {
    auth: authReducer, // Using the imported authReducer
  },
});

export default store; // Default export
