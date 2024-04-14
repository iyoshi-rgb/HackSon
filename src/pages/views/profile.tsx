import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import { getUser } from "../../utils/user"; // Adjust imports based on actual paths
import { UserContext } from "../../hooks/UserProvider";
import { UserUpdate, getProfile, updateProfile } from "../../utils/makeprofile";

// Adjusted ProfileProps to match your updateProfile function's expectation
interface ProfileProps {
  userId: string;
  userName?: string;
  bio?: string;
  userImage?: string[]; // Now singular string, matching your updateProfile definition
  favoriteSpot?: string;
  location?: string;
}

export const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState<ProfileProps | null>(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");

  useEffect(() => {
    async function fetchData() {
      const userData = await getUser();

      if (userData && userData.userId) {
        const profileData = await getProfile(userData.userId);
        setProfile(profileData);
        console.log(profile);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    alert(`You have selected: ${destination}`);
    await UserUpdate(destination, profile?.userId);
    // Here you can also do other actions like calling an API or updating the state
  };

  return (
    <>
      <div className="w-1/4 mx-auto text-neutral-content shadow-xl p-4 bg-slate-400 flex items-center justify-center p-6 mt-10 h-100 items-center justify-between">
        <div className="w-full bg-slate-400 flex p-6">
          <div className="flex items-center">
            {profile?.userImage?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Profile"
                className="h-16 w-16 rounded-full mr-4"
              />
            ))}
            <div className="flex flex-col">
              <div className="text-xl text-slate-700 font-medium">
                {user?.userName}
              </div>
              {profile?.location ? (
                <div className="text-sm text-slate-600">
                  地元：{profile.location}
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <select
                    className="select select-bordered w-full text-sm rounded-none-xs"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  >
                    <option value="">旅行先を選択</option>
                    <option value="北海道">北海道</option>
                    <option value="青森県">青森県</option>
                    <option value="岩手県">岩手県</option>
                    <option value="宮城県">宮城県</option>
                    <option value="秋田県">秋田県</option>
                    <option value="山形県">山形県</option>
                    <option value="福島県">福島県</option>
                    <option value="茨城県">茨城県</option>
                    <option value="栃木県">栃木県</option>
                    <option value="群馬県">群馬県</option>
                    <option value="埼玉県">埼玉県</option>
                    <option value="千葉県">千葉県</option>
                    <option value="東京都">東京都</option>
                    <option value="神奈川県">神奈川県</option>
                    <option value="新潟県">新潟県</option>
                    <option value="富山県">富山県</option>
                    <option value="石川県">石川県</option>
                    <option value="福井県">福井県</option>
                    <option value="山梨県">山梨県</option>
                    <option value="長野県">長野県</option>
                    <option value="岐阜県">岐阜県</option>
                    <option value="静岡県">静岡県</option>
                    <option value="愛知県">愛知県</option>
                    <option value="三重県">三重県</option>
                    <option value="滋賀県">滋賀県</option>
                    <option value="京都府">京都府</option>
                    <option value="大阪府">大阪府</option>
                    <option value="兵庫県">兵庫県</option>
                    <option value="奈良県">奈良県</option>
                    <option value="和歌山県">和歌山県</option>
                    <option value="鳥取県">鳥取県</option>
                    <option value="島根県">島根県</option>
                    <option value="岡山県">岡山県</option>
                    <option value="広島県">広島県</option>
                    <option value="山口県">山口県</option>
                    <option value="徳島県">徳島県</option>
                    <option value="香川県">香川県</option>
                    <option value="愛媛県">愛媛県</option>
                    <option value="高知県">高知県</option>
                    <option value="福岡県">福岡県</option>
                    <option value="佐賀県">佐賀県</option>
                    <option value="長崎県">長崎県</option>
                    <option value="熊本県">熊本県</option>
                    <option value="大分県">大分県</option>
                    <option value="宮崎県">宮崎県</option>
                    <option value="鹿児島県">鹿児島県</option>
                    <option value="沖縄県">沖縄県</option>
                  </select>
                  <button type="submit" className="btn btn-primary mt-2">
                    Submit
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
