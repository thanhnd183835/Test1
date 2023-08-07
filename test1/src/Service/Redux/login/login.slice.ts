import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../config";
import { Account } from "../../../Model/AccountType";

interface AuthState {
  loading: boolean;
  error: string;
  auth: { code: number; data: Record<string, any> };
}

export const signIn = createAsyncThunk(
  "auth/sign-in",
  async (body: Account) => {
    try {
      const response = await axiosInstance.post(`api/auth/sign-in`, body);
      return response.data; // Assuming the response has a "data" property with the user data
    } catch (error) {
      throw error;
    }
  }
);

const initialState: AuthState = {
  loading: false,
  error: "",
  auth: { code: 0, data: {} },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = "Unknown error"; // Store the error message in the state
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.auth.data = action.payload; // Assuming the user data is in the payload
      });
  },
});

export const { reducer: authReducer } = authSlice;
export default authReducer;
