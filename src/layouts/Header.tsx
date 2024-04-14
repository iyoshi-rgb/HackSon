import React, { useContext } from "react";
import { GoogleButton } from "../components/GoogleButton";
import { handleSocialLogin } from "../utils/login";
import { Link } from "react-router-dom";
import { AuthContext } from "../hooks/AuthProvider";
import { Logout } from "../utils/logout";

export const Header = () => {
  // useContext から isLoggedIn と setIsLoggedIn を正しく取得
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  // ログアウト処理
  const handleLogout = async () => {
    await Logout();
    setIsLoggedIn(false); // ログイン状態をfalseに設定
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-2xl">
        <header className="flex items-center justify-between py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 text-2xl  pl-3 font-bold text-black md:text-3xl"
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
            まちわたし
          </Link>

          <div className="flex-1 items-center  hidden lg:flex">
            <nav className="flex-1 flex gap-5 ">
              <Link
                to="/"
                className="inline-flex items-center gap-1 pl-5 text-lg font-semibold hover:text-cyan-500 active:text-cyan-700"
              >
                Home
              </Link>
              <Link
                to="/roomlist"
                className="inline-flex items-center gap-1 text-lg font-semibold hover:text-cyan-500 active:text-cyan-700"
              >
                部屋一覧
              </Link>
            </nav>

            <div className="flex items-center gap-4 pl-5">
              {isLoggedIn ? (
                <button onClick={handleLogout} className="btn btn-outline">
                  ログアウト
                </button>
              ) : (
                <GoogleButton handleClickMethod={handleSocialLogin} />
              )}
              <details className="dropdown">
                <summary className="m-1 btn">
                  <svg
                    className="swap-off fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                  >
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                  </svg>
                  Menu
                </summary>
                <ul className="dropdown-content z-[1] menu p-2 font-semibold shadow bg-base-100 rounded-box w-52">
                  <Link to={"/profile"}>
                    <li className="pb-2">Mypage</li>
                  </Link>
                  <Link to={"/roomlist"}>
                    <li className="pb-2">参加した部屋</li>
                  </Link>
                  <Link to={"/makeroom"}>
                    <li className="pb-2">作成した部屋</li>
                  </Link>
                </ul>
              </details>
            </div>
          </div>

          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="m-1">
              <button
                type="button"
                className="inline-flex items-center rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4 a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4 a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Menu
              </button>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/roomlist">
                <li>部屋一覧</li>
              </Link>
              {isLoggedIn && (
                <Link to="/profile">
                  <li>Profile</li>
                </Link>
              )}
            </ul>
          </div>
        </header>
      </div>
    </div>
  );
};
