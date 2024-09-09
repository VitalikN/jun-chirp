import { RootState } from "../store";
const getName = (state: RootState) => state.auth?.user?.userName;
const getEmail = (state: RootState) => state.auth?.user?.email;
const selectIsConfirmed = (state: RootState) => state.auth?.user?.isConfirmed;
const selectToken = (state: RootState) => state.auth?.user?.accessToken;
const selectRole = (state: RootState) => state.auth?.user?.role;

const authSelector = {
  selectToken,
  getName,
  getEmail,
  selectIsConfirmed,
  selectRole,
  // selectIsSuccess,
};
export default authSelector;
