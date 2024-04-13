import React, { useState } from "react";
import { GoogleButton } from "../components/GoogleButton";
import { handleSocialLogin } from "../utils/login";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="bg-white lg:pb-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <header className="flex items-center justify-between py-4 md:py-8">
          <a
            href="/"
            className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
            aria-label="logo"
          >
            <svg
              width="95"
              height="94"
              viewBox="0 0 95 94"
              className="h-auto w-6 text-indigo-500"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M96 0V47L48 94H0V47L48 0H96Z" />
            </svg>
            Flowrift
          </a>

          <nav className="hidden gap-12 lg:flex">
            <Link
              to={"/home"}
              className="inline-flex items-center gap-1 text-lg font-semibold hover:text-indigo-500 active:text-indigo-700"
            >
              Home
            </Link>

            <Link
              to={"/chat"}
              className="inline-flex items-center gap-1 text-lg font-semibold hover:text-indigo-500 active:text-indigo-700"
            >
              Chat
            </Link>
            <Link
              to={"/roomlist"}
              className="inline-flex items-center gap-1 text-lg font-semibold hover:text-indigo-500 active:text-indigo-700"
            >
              部屋一覧
            </Link>
          </nav>

          <div className="-ml-8 hidden flex-col gap-2.5 sm:flex-row sm:justify-center lg:flex lg:justify-start">
            {isLoggedIn ? (
              <>
                <div className="avatar">
                  <div className="w-12">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
              </>
            ) : (
              <GoogleButton handleClickMethod={handleSocialLogin} />
            )}
          </div>

          <div className="dropdown">
            <div tabIndex={0} role="button" className="m-1">
              <button
                type="button"
                className="inline-flex items-center rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4 a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                Menu
              </button>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Chat</a>
              </li>
              <li>
                <a>About</a>
              </li>
              {isLoggedIn && (
                <li>
                  <a>Profile</a>
                </li>
              )}
            </ul>
          </div>
        </header>
      </div>
    </div>
  );
};
