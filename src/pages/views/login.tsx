import React, { useContext, useEffect, useState } from "react";
import { GoogleButton } from "../../components/GoogleButton";

import { handleSocialLogin } from "../../utils/login";
import { getUser } from "../../utils/user";

import { Top } from "../../layouts/login/top";
import LoadingAndRedirect from "../../layouts/login/Modal";
import Accordion from "../../layouts/login/Accordion";
import { UserContext } from "../../hooks/UserProvider";
import { LocationContext } from "../../hooks/LocationProvider";
import { AuthContext } from "../../hooks/AuthProvider";
import { insertProfile } from "../../utils/profile";

export const Login = () => {
  const { user, setUser }: any = useContext(UserContext);
  const { setLocation }: any = useContext(LocationContext);
  const { isLoggedIn, setIsLoggedIn }: any = useContext(AuthContext);

  useEffect(() => {
    async function fetchUser() {
      const user = await getUser();
      if (user) {
        setIsLoggedIn(true);
        setUser({ id: user.userId, name: user.userName });
        const result = await insertProfile(user.userId, user.userName);
        console.log("result:", result);
      }
    }

    fetchUser();
  }, []);

  return (
    <div className="text-center">
      <div className="mt-10">
        <Top />
      </div>
      {!isLoggedIn && (
        <div className="my-5">
          <GoogleButton handleClickMethod={handleSocialLogin} />
        </div>
      )}
      <div className="my-5">
        <Accordion />
      </div>
    </div>
  );
};
