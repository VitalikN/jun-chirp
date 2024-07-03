import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { clearToken } from "./authSlice";
import store from "../store";
import dotenv from "dotenv";

dotenv.config();

type RootState = ReturnType<typeof store.getState>;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: process.env.BASE_URL,
    baseUrl: "https://junchirp.onrender.com/",

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as { auth: { token: string } }).auth.token;
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
    // confirmEmail: builder.mutation({
    //   query: (data) => ({
    //     url: "users/confirm",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["auth"],
    // }),
    //   signIn: builder.mutation({
    //     query: (credentials) => ({
    //       url: "users/login",
    //       method: "POST",
    //       body: credentials,
    //     }),
    //     invalidatesTags: ["auth"],
    //   }),
    //   current: builder.query({
    //     query: () => "/user",

    //     onQueryStarted: (_, { dispatch, getState }) => {
    //       const token = (getState() as RootState).auth.token;
    //       if (!token) {
    //         dispatch(clearToken());
    //       }
    //     },
    //     providesTags: ["auth"],
    //   }),
    //   update: builder.mutation({
    //     query: (updates) => ({
    //       url: "/user",
    //       method: "PUT",
    //       body: updates,
    //     }),
    //     invalidatesTags: ["auth"],
    //   }),
  }),
});

export const {
  useRegisterMutation,
  // useConfirmEmailMutation,
  // useSignInMutation, useUpdateMutation
} = authApi;
