import { RootState } from "@/store";

export const getIsAuthenticated = (state: RootState) =>
  state.auth.status === "success";

export const getAuthStatus = (state: RootState) => state.auth.status;

export const getAuthState = (state: RootState) => state.auth;
