import { Account } from "./../../../Model/AccountType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";

const initialState: Account = {
  _id: "",
  email: "",
  avatar: "",
  userName: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    auth: (state, action: PayloadAction<Account>) => {
      return {
        ...state,
        _id: action.payload._id,
        email: action.payload.email,
        avatar: action.payload.avatar,
        userName: action.payload.userName,
      };
    },
  },
});

export const { auth } = authSlice.actions;
export default authSlice.reducer;
