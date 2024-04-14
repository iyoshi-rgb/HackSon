import React from "react";
import { GoogleButton } from "./GoogleButton";
import { handleSocialLogin } from "../utils/login";

export const LoginPages = () => {
  return (
    <div className="flex flex-col ">
      <div className="m-auto">
        <GoogleButton handleClickMethod={handleSocialLogin} />
      </div>
    </div>
  );
};
