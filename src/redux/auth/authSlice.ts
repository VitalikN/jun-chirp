import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { authApi } from "./authApi";

export interface IUser {
  userName: string | null;
  email: string | null;
  id: number | null;
  accessToken?: string | null;
  isConfirmed: boolean;
}

export interface IAuthState {
  user: IUser;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isLoading: boolean;
}

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user"],
};

const initialState: IAuthState = {
  user: {
    userName: null,
    email: null,
    id: null,
    isConfirmed: false,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearToken: () => {
      return { ...initialState };
    },
  },

  extraReducers: (builder) => {
    builder

      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.token = payload.user?.accessToken;
          state.isLoggedIn = true;
        }
      )

      .addMatcher(
        authApi.endpoints.confirmEmail.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.isLoggedIn = true;
          state.token = payload.accessToken;
        }
      )

      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.token = payload.user?.accessToken;
          state.isLoggedIn = true;
        }
      );
    // .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
    //   console.log("Logout fulfilled, resetting state");

    //   state.token = null;
    //   state.isLoggedIn = false;
    //   state.user = initialState.user;
    // });
  },
});

const persisteAuthReducer = persistReducer(
  authPersistConfig,
  authSlice.reducer
);

export const { clearToken } = authSlice.actions;
export default persisteAuthReducer;
