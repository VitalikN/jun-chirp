import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { authApi } from "./authApi";

export interface IUser {
  userName: string | null;
  email: string | null;
  id: number | null;
  token?: string | null;
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
      .addMatcher(authApi.endpoints.register.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.token = payload.user.accessToken;
          state.isLoggedIn = true;
          state.isLoading = false;
        }
      )
      .addMatcher(authApi.endpoints.confirmEmail.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        authApi.endpoints.confirmEmail.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.isLoggedIn = true;
          state.isLoading = false;
        }
      )
      .addMatcher(authApi.endpoints.confirmEmail.matchRejected, (state) => {
        state.isLoading = false;
      })
      .addMatcher(authApi.endpoints.login.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.token = payload.user.accessToken;
          state.isLoggedIn = true;
          state.isLoading = false;
        }
      )
      .addMatcher(authApi.endpoints.login.matchRejected, (state) => {
        state.isLoading = false;
      });
  },
});

// .addMatcher(authApi.endpoints.signIn.matchPending, (state) => {
//   state.isLoading = true;
// })
// .addMatcher(
//   authApi.endpoints.signIn.matchFulfilled,
//   (state, { payload }) => {
//     state.token = payload.token;
//     state.isLoggedIn = true;
//     state.isLoading = false;
//   }
// )
// .addMatcher(
//   (action) => action.type === "auth/clearToken",
//   (state) => {
//     state.token = null;
//     state.isLoggedIn = false;
//   }
// )
// .addMatcher(authApi.endpoints.current.matchPending, (state) => {
//   state.isRefreshing = true;
// })
// .addMatcher(
//   authApi.endpoints.current.matchFulfilled,
//   (state, { payload }) => {
//     state.token = payload.token;
//     state.isLoggedIn = true;
//     state.isRefreshing = false;
//   }
// )
// .addMatcher(authApi.endpoints.current.matchRejected, (state) => {
//   state.isRefreshing = false;
// });
// .addMatcher(authApi.endpoints.oAuth.matchPending, (state) => {
//   state.isLoading = true;
// })
// .addMatcher(
//   authApi.endpoints.oAuth.matchFulfilled,
//   (state, { payload }) => {
//     state.token = payload.token;
//     // toasterService.sucsess("Вітаємо! Вхід Успішно виконаний");
//     state.isLoading = false;
//   }
// );
// .addMatcher(authApi.endpoints.deleteUser.matchFulfilled, (state) => {
//   state.name = null;
//   state.email = null;
//   state.lastName = null;
//   state.phone = null;
//   state.id = null;
//   state.token = null;
//   state.isLoggedIn = false;
// });

const persisteAuthReducer = persistReducer(
  authPersistConfig,
  authSlice.reducer
);

export const { clearToken } = authSlice.actions;
export default persisteAuthReducer;
