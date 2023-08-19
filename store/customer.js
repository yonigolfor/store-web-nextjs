import { createSlice } from "@reduxjs/toolkit";

const initialCustomerState = {
  // fullName: null,
  // email: null,
  // phoneNumber: null,
  // address: null,
  // paymentMethod: null,
  // userNotes: null,
};

// function helpers here...

const customerSlice = createSlice({
  name: "customer",
  initialState: initialCustomerState,
  reducers: {
    setCustomerData(state, action) {
      // state = action.payload;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.phoneNumber = action.payload.phoneNumber;
      state.address = action.payload.address;
      state.paymentMethod = action.payload.paymentMethod;
      state.userNotes = action.payload.userNotes;
    },
    // increase(state, action) {
    //   state.counter += action.payload;
    // },
    // toggleCounter(state) {
    //   state.isShow = !state.isShow;
    // },
  },
});

export const customerActions = customerSlice.actions;
export default customerSlice.reducer;
