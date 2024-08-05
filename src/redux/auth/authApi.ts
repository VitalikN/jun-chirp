import mainApi from "../mainApi";
export const authApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "auth/register",
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
        url: "auth/login",
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
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "DELETE",
      }),

      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useConfirmEmailMutation,
  useLoginMutation,
  useResendConfirmationCodeMutation,
  useLogoutMutation,
} = authApi;
