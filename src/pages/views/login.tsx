import React, { useEffect, useState } from "react";
import { GoogleButton } from "../../components/GoogleButton";
import { handleSocialLogin } from "../../utils/supabasefunction";
import { getUser } from "../../utils/supabasefunction";
import { Top } from "../../layouts/login/top";

export const Login = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const userId = await getUser();
      setUserId(userId);
    }

    fetchUser();
  }, []);

  console.log(userId);

  return (
    <div className="text-center">
      <Top />
      <div className="mt-5">
        <GoogleButton handleClickMethod={handleSocialLogin} />
      </div>
    </div>
  );
};
