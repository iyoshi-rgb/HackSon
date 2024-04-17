import React, { useContext, useEffect, useState } from "react";
import { GoogleButton } from "../../components/GoogleButton";

import { handleSocialLogin } from "../../utils/login";
import { getUser } from "../../utils/user";

import { UserContext } from "../../hooks/UserProvider";
import { LocationContext } from "../../hooks/LocationProvider";
import { AuthContext } from "../../hooks/AuthProvider";
import { insertProfile } from "../../utils/profile";

import { useForm, SubmitHandler } from "react-hook-form";

type FormData = {
  email: string;
  name: string;
};

export const Login = () => {
  const { user, setUser }: any = useContext(UserContext);
  const { setLocation }: any = useContext(LocationContext);
  const { isLoggedIn, setIsLoggedIn }: any = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

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

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <div className="flex flex-col items-center w-full max-w-md p-4 shadow-md mb-4 bg-slate-200">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="w-full mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "メールアドレスを入力してください",
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">
                  {errors.email.message}
                </p>
              )}
            </label>
          </div>
          <div className="w-full mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              <input
                id="name"
                type="text"
                {...register("name", { required: "名前を入力してください" })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="名前"
              />
              {errors.name && (
                <p className="text-red-500 text-xs italic">
                  {errors.name.message}
                </p>
              )}
            </label>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
          >
            送信
          </button>
        </form>
        <GoogleButton handleClickMethod={handleSocialLogin} />
      </div>
    </div>
  );
};
