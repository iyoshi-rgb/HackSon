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
            className="inline-flex items-center gap-2.5 text-lg pl-3 font-bold text-black md:text-lg font-sans mx-4"
            aria-label="logo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="#fcc800"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-heart-handshake"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
              <path d="m18 15-2-2" />
              <path d="m15 18-2-2" />
            </svg>
            まちわたし
          </Link>

          <div className="flex-1 items-center  hidden lg:flex">
            <nav className="flex-1 flex gap-5">
              {/* <Link
                to="/"
                className="inline-flex items-center gap-1 pl-5 hover:text-blue-700 active:text-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-home"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </Link> */}
              <Link
                to={"/roomlist"}
                className="inline-flex items-center gap-1 text-sm font-semibold mx-2 hover:text-blue-700 active:text-indigo-700"
              >
                募集中の部屋
              </Link>
              <Link
                to={"/myRooms"}
                className="inline-flex items-center gap-1 text-sm font-semibold mx-2 hover:text-blue-700 active:text-indigo-700"
              >
                参加済みの部屋
              </Link>
              <Link
                to={"/makeroom"}
                className="inline-flex items-center gap-1 text-sm font-semibold mx-2 hover:text-blue-700 active:text-indigo-700"
              >
                募集部屋を作る
              </Link>
            </nav>

            <div className="flex items-center gap-4 pl-5">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="btn bg-blue-700 text-white rounded-m hover:bg-white hover:text-blue-700 hover:border-blue-700 hover:border-2"
                >
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
                </summary>
                <ul className="dropdown-content z-[1] menu p-2 font-semibold shadow bg-base-100 rounded-box ">
                  <Link to={"/profile"} className="flex flex-row items-center">
                    <CircleUserRound />
                    <li className="p-2">マイページ</li>
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
            </ul>
          </details>
        </header>
      </div>
    </div>
  );
};
