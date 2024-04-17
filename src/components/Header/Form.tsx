import React, { useState, useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { GoogleButton } from "../GoogleButton";
import { handleSocialLogin } from "../../utils/login";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../hooks/AuthProvider";

type LoginFormData = {
  email: string;
};

type SignInFormData = {
  email: string;
  name: string;
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const { isLoggedIn, setIsLoggedIn }: any = useContext(AuthContext);

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log(data);
    setIsLoggedIn(true);
  };

  return (
    <>
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

        <div className="w-full flex justify-center mb-3">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-bold w-32 hover:bg-blue-700 rounded-full"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();
  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    console.log(data);
  };
  return (
    <>
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
        <div className="w-full flex justify-center mb-3">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-bold w-32 hover:bg-blue-700 rounded-full"
          >
            Sign in
          </button>
        </div>
      </form>
    </>
  );
};

export const Form = () => {
  const [check, setCheck] = useState<boolean>(true);

  return (
    <div>
      <div className="join flex justify-center">
        <button className="btn join-item" onClick={() => setCheck(true)}>
          Login
        </button>
        <button className="btn join-item" onClick={() => setCheck(false)}>
          Sign in
        </button>
      </div>

      <div className="flex justify-center py-5">
        {check ? (
          <p className="font-bold">Login</p>
        ) : (
          <p className="font-bold">Sign in</p>
        )}
      </div>

      {check ? <LoginForm /> : <SignInForm />}

      <div className=" flex justify-center">
        <GoogleButton handleClickMethod={handleSocialLogin} />
      </div>
    </div>
  );
};
