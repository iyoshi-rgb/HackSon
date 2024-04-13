import React, { useEffect, useState } from "react";
import { GoogleButton } from "../../components/GoogleButton";
import { handleSocialLogin, getUser } from "../../utils/login";
import { Top } from "../../layouts/login/top";
import LoadingAndRedirect from "../../layouts/login/Modal";
import Accordion from "../../layouts/login/Accordion";

export const Login = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const userId = await getUser();
      if (userId) {
        setUserId(userId);
      }
    }

    fetchUser();
  }, []);

  console.log("userID:", userId);

  return (
    <div className="text-center">
      {userId ? ( // userId が存在する場合のみ以下の要素を表示
        <>
          <LoadingAndRedirect />
        </>
      ) : (
        // userId が存在しない場合は以下の要素を表示
        <>
          <div className="mt-10">
            <Top />
          </div>
          <div className="my-5">
            <GoogleButton handleClickMethod={handleSocialLogin} />
          </div>
          <Accordion />
        </>
      )}
    </div>
  );
};
