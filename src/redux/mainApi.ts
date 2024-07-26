import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import store from "./store";

type RootState = ReturnType<typeof store.getState>;

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth?.user?.accessToken;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["auth", "user"],
  endpoints: () => ({}),
});
export default mainApi;
