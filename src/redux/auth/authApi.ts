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
    requestPasswordReset: builder.mutation({
      query: ({ email }) => ({
        url: "request-password-reset",
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["auth"],
    }),
    resetPassword: builder.mutation({
      query: ({ email, code, newPassword }) => ({
        url: "reset-password",
        method: "POST",
        body: { email, code, newPassword },
      }),
      invalidatesTags: ["auth"],
    }),
    setRole: builder.mutation({
      query: (role) => ({
        url: "users/confirm-role",
        method: "PATCH",
        body: role,
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
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
  useSetRoleMutation,
} = authApi;
