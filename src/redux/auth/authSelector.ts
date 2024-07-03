import { RootState } from "../store";
const getName = (state: RootState) => state.auth.user.userName;
const getEmail = (state: RootState) => state.auth.user.email;

const selectToken = (state: RootState) => state.auth.token;
const selectIsLoading = (state: RootState) => state.auth.isLoading;

const authSelector = {
  selectToken,
  getName,
  getEmail,
  selectIsLoading,
};
export default authSelector;
