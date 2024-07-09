"use client";

import { useRouter } from "next/navigation";
const useRouterPush = () => {
  const router = useRouter();

  const pushRouter = (route: string) => {
    router.push(route);
  };
  return { pushRouter };
};

export default useRouterPush;
