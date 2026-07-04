import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlics.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;   
