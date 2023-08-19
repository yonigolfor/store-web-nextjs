import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import customerReducer from "./customer";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    customer: customerReducer,

    // counter: counterReducer,
  },
});

export default store;
