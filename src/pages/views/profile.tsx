import React, { useEffect, useState } from "react";
import { getUserName } from "../../utils/user";
import { getProfile, getUser } from "../../utils/login";

interface Profile {
  userId: string;
  bio?: string;
  userImage?: string;
  favoriteSpot?: string;
  location?: string;
  // likes:number;
}

export const Profile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userName, setUserName] = useState<string>("");
  useEffect(() => {
    async function fetchData() {
      const userData = await getUserName(); // getUserName の戻り値を直接分割代入しない

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

  // プロフィール情報の読み込み中または未取得の場合
  // if (!profile) return <div>Loading...</div>;

  return (
    <div className="">
      <div className="w-full h-24 bg-slate-400 flex">
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
          <button className="mt-2 mx-4  btn btn-active">編集する</button>
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
  );
};
