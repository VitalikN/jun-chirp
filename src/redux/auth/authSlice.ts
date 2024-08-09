import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { authApi } from "./authApi";
import { IAuthState } from "@/utils/types/IUser";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "user"],
};

const initialState: IAuthState = {
  user: {
    userName: null,
    email: null,
    id: null,
    isConfirmed: false,
    accessToken: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearToken: () => {
      return { ...initialState };
    },
    tokenReceived: (state, { payload }) => {
      state.user.accessToken = payload.accessToken;
    },
    setToken: (state, action) => {
      state.user.accessToken = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
        }
      )

      .addMatcher(
        authApi.endpoints.confirmEmail.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
        }
      )

      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
        }
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = initialState.user;
      });
  },
});

const persisteAuthReducer = persistReducer(
  authPersistConfig,
  authSlice.reducer
);

export const { clearToken, tokenReceived, setToken } = authSlice.actions;
export default persisteAuthReducer;
