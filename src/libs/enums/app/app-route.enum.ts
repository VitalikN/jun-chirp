const AppRouteEnum = {
  ANY: "*",
  ROOT: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/register",
  SUPPORT: "/support",
  MY_OFFICE: "/my-office",
  ABOUT: "/about",
  CONFIRM: "/confirm",
  PRIVACY_POLICY: "/privacy-policy",
  TERMS_OF_SERVICE: "/terms-of-service",
  REQUEST_PASSWORD_RESET: "/request-password-reset",
  RESET_PASSWORD: "/reset-password",
  USER_DATA: "/user-data",
  //
  ACCOUNT_VERIFICATION: "/account-verification",
  ROLE_CONFIRMATION: "/account-verification/role-confirmation",
} as const;

export { AppRouteEnum };
