
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUser } from "../../utils/user";
import { getProfile } from "../../utils/login";
import Modal from "../../components/Modal";
import { Logout } from "../../utils/logout";
import { UserContext } from "../../hooks/UserProvider";
import { LocationContext } from "../../hooks/LocationProvider"

interface ProfileProps {
  userId: string;
  userName?: string;
  bio?: string;
  userImage?: string;
  favoriteSpot?: string;
  location?: string;
}

export const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState<ProfileProps | null>(null);
  const [userName, setUserName] = useState<string>("");

  const { user } = useContext(UserContext);
  const { location, setLocation } = useContext(LocationContext);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const userData = await getUser();
  //     if (userData) {
  //       const { userId } = userData;
  //       if (userId) {
  //         const profileData = await getProfile(userId);
  //         setProfile(profileData);
  //       }
  //     } else {
  //       console.log("ユーザーがログインしていません");
  //     }
  //   };
  //   fetchData();
  // }, []);
  useEffect(() => {
    async function fetchData() {
      const userData = await getUser(); // getUserName の戻り値を直接分割代入しない

      if (userData) {
        // userDataがundefinedまたはnullでないことを確認
        const { userId, userName } = userData; // ここで分割代入
        if (userId) {
          const profileData = await getProfile(userId);
          setProfile(profileData);
          setUserName(userName || ""); // userNameがundefinedの場合はデフォルトで空文字列を設定
        }
      } else {
        console.log("ユーザーがログインしていません");
      }
    }
    fetchData();
  }, []);

  const handleLogout = async () => {
    await Logout();
    navigate("/");
  };

  const handleUpdateProfile = (updatedProfile: ProfileProps) => {
    setProfile(updatedProfile);
    setShowModal(false);
    // 更新されたプロファイル情報をサーバーに送信するロジックをここに実装
  };

  return (
<
    <>
      <Modal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        profile={profile || { userId: "" }}
        onUpdate={handleUpdateProfile}
      />

      <div className="">
        <div className="w-full h-24 bg-slate-400 flex">
          <button onClick={handleLogout} className="btn btn-neutral">
            Logout
          </button>
          <div className="flex justify-center w-4/5">
            <img className="mt-3 h-10 w-10 mr-4 rounded-full" src={profile?.userImage || "default.png"} alt="画像" />
            <div className="flex flex-col">
              <div className="text-xl font-medium">{userName}</div>
              <div>
                <div>{profile?.location || "未設定"}</div>


                {/* いいね機能の追加 */}
                {/* <div>{profile.likes}</div> */}
              </div>
            </div>
            <button onClick={() => setShowModal(true)} className="mt-2 mx-4  btn btn-active">
              編集する
            </button>
          </div>
        </div>

        {/* 一言コメントとおすすめスポットを表示 */}
        <div className="h-full flex flex-col items-center px-8">
          <div className="w-1/2">
            <div className="mt-4 mb-10">
              <div className="text-xl font-semibold ">ひとこと</div>
              <div>{profile?.bio || "未設定"}</div>
            </div>
            <div className="mt-4 mb-10">
              <div className="text-xl font-semibold">おすすめスポット</div>
              <div className="">{profile?.favoriteSpot || "未設定"}</div>
            </div>
          </div>
        </div>
      </div>

    </>

  );
};
