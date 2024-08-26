"use client";
import Error505 from "@/components/ErrorPage505/ErrorPage505";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string | undefined };
  reset: () => void;
}) {
  return (
    <>
      <Error505 error={error} reset={reset} />
    </>
  );
}
