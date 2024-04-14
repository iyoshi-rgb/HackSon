import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import { getUser } from "../../utils/user"; // Adjust imports based on actual paths
import { UserContext } from "../../hooks/UserProvider";
import { getProfile, updateProfile } from "../../utils/makeprofile";
import { LocationContext } from "../../hooks/LocationProvider";
import { AuthContext } from "../../hooks/AuthProvider";

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
  const [userName, setUserName] = useState<string>("");
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
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

  const handleUpdateProfile = async (updatedProfile: ProfileProps) => {
    if (profile?.userId) {
      const result = await updateProfile(profile.userId, {
        userId: profile.userId,
        userName: updatedProfile.userName,
        bio: updatedProfile.bio,
        userImage: updatedProfile.userImage
          ? updatedProfile.userImage[0]
          : undefined,
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
            userName: user?.userName || "",
            bio: "",
            userImage: [], // 空の配列として初期化
            favoriteSpot: "",
            location: "",
          }
        }
        onUpdate={handleUpdateProfile}
      />

      {/* <button
        onClick={() => setShowModal(true)}
        className="btn btn-active mx-auto"
      >
        編集する
      </button> */}
      <div className="w-1/4 mx-auto text-neutral-content shadow-xl p-4 bg-slate-400 flex items-center justify-center p-6 mt-10 h-100 items-center justify-between">
        <div className="w-full bg-slate-400 flex p-6">
          <div className="flex items-center">
            {profile?.userImage ? (
              profile.userImage.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Profile"
                  className="h-16 w-16 rounded-full mr-4"
                />
              ))
            ) : (
              <img
                src={
                  Array.isArray(profile?.userImage)
                    ? profile?.userImage[0]
                    : profile?.userImage || "default.png"
                }
                alt="Profile"
                className="h-16 w-16 mr-4 rounded-full"
              />
            )}
            <div className="flex flex-col">
              <div className="text-xl text-slate-700 font-medium">
                {user?.userName}
              </div>
              <div className="text-sm text-slate-600">
                地元：{profile?.location || "未設定"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
