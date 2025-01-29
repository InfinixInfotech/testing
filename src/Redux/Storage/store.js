import { configureStore } from "@reduxjs/toolkit";
import sendMailReducer from "../Reducers/sendMailReducer";

const store = configureStore({
  reducer: {
    // sliceName : ReducerFileName
    sendMail: sendMailReducer,
  },
});

export default store;
