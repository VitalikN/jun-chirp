"use client";

import { usePathname, useRouter } from "next/navigation";

const Register = () => {
  const pathname = usePathname();
  const router = useRouter();

  // useEffect(() => {
  //   token ? router.push("/personal_office") : "";
  // }, [token, router]);

  return (
    <section>
      <div>Register</div>
    </section>
  );
};

export default Register;
