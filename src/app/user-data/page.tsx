"use client";

import { setUser } from "@/redux/auth/authSlice";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const UserData = ({ searchParams }: any) => {
  const dispatch = useDispatch();
  const { userName, token, email, photo } = searchParams;
  useEffect(() => {
    if (token) {
      dispatch(setUser({ accessToken: token, userName, email, photo }));
    }
  }, [dispatch, email, photo, token, userName]);
  return (
    <div>
      <h1>UserData</h1>
      <p>{userName}</p>
      <p>{email}</p>
      {photo && (
        <Image src={`${photo}`} alt="user photo" width={100} height={100} />
      )}
    </div>
  );
};

export default UserData;
