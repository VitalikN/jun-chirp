import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { clearToken } from "./authSlice";
import store from "../store";

type RootState = ReturnType<typeof store.getState>;

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "users/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["auth"],
    }),
    confirmEmail: builder.mutation({
      query: (data) => ({
        url: "users/confirm",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth"],
    }),
    resendConfirmationCode: builder.mutation({
      query: ({ email }) => ({
        url: "users/resend-confirmation-code",
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});
// users/resend-confirmation-code;

export const {
  useRegisterMutation,
  useConfirmEmailMutation,
  useLoginMutation,
  useResendConfirmationCodeMutation,
} = authApi;
