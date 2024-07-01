import { RootState } from "../store";

const selectToken = (state: RootState) => state.auth.token;
const selectIsLoading = (state: RootState) => state.auth.isLoading;

const authSelector = {
  selectToken,

  selectIsLoading,
};
export default authSelector;
