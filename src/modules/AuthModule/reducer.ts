import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthStatus = "init" | "loading" | "success" | "failed";

export interface IAuthUserData {
  username: string;
  id: string;
}

export interface AuthData {
  token: string;
  userData: IAuthUserData;
}

type AuthState = Partial<AuthData> & { status: AuthStatus };

const initialState: AuthState = {
  status: "init",
  token: undefined,
  userData: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<AuthStatus>) => ({
      ...state,
      status: payload,
    }),
    setAuthData: (state, { payload }: PayloadAction<AuthData>) => ({
      ...state,
      status: "success",
      token: payload.token,
      userData: payload.userData,
    }),
    clearAuthData: (state) => ({
      ...state,
      status: "failed",
      token: undefined,
      userData: undefined,
    }),
  },
});

export const { actions } = authSlice;
