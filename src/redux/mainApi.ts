import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import store from "./store";
import { clearToken, tokenReceived } from "./auth/authSlice";

type RootState = ReturnType<typeof store.getState>;

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth?.user?.accessToken;

    if (apiKey) {
      headers.set("x-api-key", apiKey);
    }
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log("Спроба отримати новий токен");

    const refreshResult = await baseQuery(
      {
        url: "auth/refresh-token",
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
      api,
      extraOptions
    );
    console.log(refreshResult);
    console.log("refreshResult.data 151)", refreshResult.data);

    if (refreshResult.data) {
      api.dispatch(tokenReceived(refreshResult.data));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearToken());
    }
  }
  return result;
};

const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["auth", "user"],
  endpoints: () => ({}),
});

export default mainApi;
