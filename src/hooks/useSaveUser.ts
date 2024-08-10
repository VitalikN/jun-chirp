import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/auth/authSlice";
import { IUser } from "@/utils/types/IUser";

const useSaveUser = ({ userName, token, email, photo }: IUser) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(setUser({ accessToken: token, userName, email, photo }));
    }
  }, [dispatch, email, photo, token, userName]);
};

export default useSaveUser;
