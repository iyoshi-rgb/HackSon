import React, { useContext } from "react";
import { GoogleButton } from "../components/GoogleButton";
import { handleSocialLogin } from "../utils/login";
import { Link } from "react-router-dom";
import { AuthContext } from "../hooks/AuthProvider";
import { Logout } from "../utils/logout";
import { CircleUserRound } from "lucide-react";
import { MessageSquareText, NotebookText, NotebookPen } from "lucide-react";

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
                to={"/roomlist"}
                className="inline-flex items-center gap-1 text-base font-semibold hover:text-indigo-500 active:text-indigo-700"
              >
                募集されている部屋
              </Link>
              <Link
                to={"/myRooms"}
                className="inline-flex items-center gap-1 text-base font-semibold hover:text-indigo-500 active:text-indigo-700"
              >
                参加済みの部屋
              </Link>
              <Link
                to={"/makeroom"}
                className="inline-flex items-center gap-1 text-base font-semibold hover:text-indigo-500 active:text-indigo-700"
              >
                募集部屋を作る
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
                <summary className="m-1 btn mr-10">
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
                <ul className="dropdown-content z-[1] menu p-2 font-semibold shadow bg-base-100 rounded-box ">
                  <Link to={"/profile"} className="flex flex-row items-center">
                    <CircleUserRound />
                    <li className="p-2">Mypage</li>
                  </Link>
                  <Link to={"/roomlist"} className="flex flex-row items-center">
                    <NotebookText />
                    <li className="p-2">参加した部屋</li>
                  </Link>
                  <Link
                    to={"/createdroom"}
                    className="flex flex-row items-center"
                  >
                    <NotebookPen />
                    <li className="p-2">作成した部屋</li>
                  </Link>
                  {isLoggedIn && (
                    <Link to={"/chat"} className="flex flex-row items-center">
                      <MessageSquareText />
                      <li className="p-2">chat</li>
                    </Link>
                  )}
                </ul>
              </details>
            </div>
          </div>

          <details className="dropdown lg:hidden">
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
            <ul className="dropdown-content z-[1] menu p-2 font-semibold shadow bg-base-100 rounded-box ">
              <Link to={"/profile"} className="flex flex-row items-center">
                <CircleUserRound />
                <li className="p-2">Mypage</li>
              </Link>
              <Link to={"/roomlist"} className="flex flex-row items-center">
                <NotebookText />
                <li className="p-2">参加した部屋</li>
              </Link>
              <Link to={"/makeroom"} className="flex flex-row items-center">
                <NotebookPen />
                <li className="p-2">作成した部屋</li>
              </Link>
              {isLoggedIn && (
                <Link to={"/chat"} className="flex flex-row items-center">
                  <MessageSquareText />
                  <li className="p-2">chat</li>
                </Link>
              )}
            </ul>
          </details>
        </header>
      </div>
    </div>
  );
};
