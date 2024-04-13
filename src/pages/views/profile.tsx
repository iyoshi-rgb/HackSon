import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import { getUser } from "../../utils/user"; // Adjust imports based on actual paths
import { UserContext } from "../../hooks/UserProvider";
import { getProfile, updateProfile } from "../../utils/makeprofile";

// Adjusted ProfileProps to match your updateProfile function's expectation
interface ProfileProps {
  userId: string; // userId is kept for internal tracking; not used in updateProfile directly
  userName?: string;
  bio?: string;
  userImage?: string[]; // Note: Now singular string, matching your updateProfile definition
  favoriteSpot?: string;
  location?: string;
}

export const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState<ProfileProps | null>(null);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      if (user) {
        // ユーザーIDを使用してプロフィール情報を取得
        const profileData = await getProfile(user.userId);
        if (profileData) {
          // プロフィール情報を状態にセット
          setProfile({
            userId: user.userId,
            bio: profileData.bio,
            userImage: profileData.userImage,
            favoriteSpot: profileData.favoriteSpot,
            location: profileData.location,
          });
        }
      }
    }

    fetchProfile();
  }, [user]);

  const handleUpdateProfile = async (updatedProfile: ProfileProps) => {
    if (profile?.userId) {
      const result = await updateProfile(profile.userId, {
        userId: profile.userId,
        userName: updatedProfile.userName,
        bio: updatedProfile.bio,
        userImage: updatedProfile.userImage ? updatedProfile.userImage[0] : undefined,
        favoriteSpot: updatedProfile.favoriteSpot,
        location: updatedProfile.location,
      });
      if (result) {
        // Assuming result is the updated profile; adjust as needed based on actual API response
        setProfile({ ...updatedProfile, userId: profile.userId }); // Reapply userId since it's not part of updateProfile
        setShowModal(false);
      } else {
        console.error("Failed to update profile");
      }
    }
  };

  const handleLogout = async () => {
    // Implement logout logic
    console.log("Logging out...");
    navigate("/");
  };

  return (
    <>
      <Modal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        profile={
          profile || {
            userId: user?.userId || "",
            userName: "",
            bio: "",
            userImage: [], // 空の配列として初期化
            favoriteSpot: "",
            location: "",
          }
        }
        onUpdate={handleUpdateProfile}
      />
      <div className="w-full h-24 bg-slate-400 flex">
        <button onClick={handleLogout} className="btn btn-neutral">
          ログアウト
        </button>
        <div className="flex justify-center w-4/5">
          {profile?.userImage ? (
            profile.userImage.map((image, index) => (
              <img key={index} src={image} alt="Profile" className="profile-image" />
            ))
          ) : (
            <img
              className="mt-3 h-10 w-10 mr-4 rounded-full"
              src={Array.isArray(profile?.userImage) ? profile?.userImage[0] : profile?.userImage || "default.png"}
              alt="画像"
            />
          )}
          <div className="flex flex-col">
            <div className="text-xl font-medium">{profile?.userName}</div>
            <div>
              <div>{profile?.location || "未設定"}</div>
            </div>
          </div>
          <button onClick={() => setShowModal(true)} className="mt-2 mx-4 btn btn-active">
            編集する
          </button>
        </div>
      </div>

      <div className="h-full flex flex-col items-center px-8">
        <div className="w-1/2">
          <div className="mt-4 mb-10">
            <div className="text-xl font-semibold">ひとこと</div>
            <div>{profile?.bio || "未設定"}</div>
          </div>
          <div className="mt-4 mb-10">
            <div className="text-xl font-semibold">おすすめスポット</div>
            <div>{profile?.favoriteSpot || "未設定"}</div>
          </div>
        </div>
      </div>
    </>
  );
};

// <div className="">
// <div className="w-full h-24 bg-slate-400 flex">
//   <button onClick={handleLogout} className="btn btn-neutral">
//     Logout
//   </button>
//   <div className="flex justify-center w-4/5">
//     {profile.userImage &&
//                 profile.userImage.map((image: any, index: any) => (
//                   <img key={index} src={image} alt="Profile" className="profile-image" />
//                 ))}
//     <div className="flex flex-col">
//       <div className="text-xl font-medium">{userName}</div>
//       <div>
//         <div>{profile?.location || "未設定"}</div>

//         {/* いいね機能の追加 */}
//         {/* <div>{profile.likes}</div> */}
//       </div>
//     </div>
//     <button onClick={() => setShowModal(true)} className="mt-2 mx-4  btn btn-active">
//       編集する
//     </button>
//   </div>
// </div>

// {/* 一言コメントとおすすめスポットを表示 */}
// <div className="h-full flex flex-col items-center px-8">
//   <div className="w-1/2">
//     <div className="mt-4 mb-10">
//       <div className="text-xl font-semibold ">ひとこと</div>
//       <div>{profile?.bio || "未設定"}</div>
//     </div>
//     <div className="mt-4 mb-10">
//       <div className="text-xl font-semibold">おすすめスポット</div>
//       <div className="">{profile?.favoriteSpot || "未設定"}</div>
//     </div>
//   </div>
// </div>
// </div>
