import { RootState } from "../store";
const getName = (state: RootState) => state.auth?.user?.userName;
const getEmail = (state: RootState) => state.auth?.user?.email;
const selectIsConfirmed = (state: RootState) => state.auth?.user?.isConfirmed;
const selectToken = (state: RootState) => state.auth.token;

const authSelector = {
  selectToken,
  getName,
  getEmail,
  selectIsConfirmed,
  // selectIsSuccess,
};
export default authSelector;
