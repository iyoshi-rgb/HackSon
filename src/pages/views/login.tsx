import React, { useEffect, useState } from "react";
import { GoogleButton } from "../../components/GoogleButton";
import { getUser, handleSocialLogin } from "../../utils/login";
import { Top } from "../../layouts/login/top";
import LoadingAndRedirect from "../../layouts/login/Modal";
import Accordion from "../../layouts/login/Accordion";

export const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    async function fetchUser() {
      const user = await getUser();
      if (user) {
        setIsLoggedIn(!isLoggedIn);
      }
    }

    fetchUser();
  }, []);

  console.log(isLoggedIn);

  return (
    <div className="text-center">
      {isLoggedIn ? (
        <>
          <LoadingAndRedirect />
        </>
      ) : (
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
