import React, { useState, useEffect, useRef } from "react";
import { prefectures } from "../data/prefectures";
import { updateProfile } from "../utils/makeprofile";

// プロファイル情報の型定義
interface ProfileProps {
  userId: string;
  userName?: string;
  bio?: string;
  userImage?: string[]; // userImageをstringの配列として定義
  favoriteSpot?: string;
  location?: string;
}

// モーダルのプロパティの型定義
interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  profile: ProfileProps;
  onUpdate: (updatedProfile: ProfileProps) => void;
}

const Modal = ({ isVisible, onClose, profile, onUpdate }: ModalProps) => {
  // 編集されたプロファイル情報を保持するための状態
  const [editedProfile, setEditedProfile] = useState<ProfileProps>(profile);
  const inputRef = useRef<HTMLInputElement>(null); // 画像アップロード用のrefを追加
  const [isLocationEditable, setIsLocationEditable] = useState<boolean>(!profile.location);
  // 親コンポーネントから渡されたプロファイル情報でフォームを初期化
  useEffect(() => {
    setEditedProfile(profile);
    setIsLocationEditable(!profile.location);
    console.log(profile);
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "userImage" && e.target.files) {
      // 複数のファイルをサポートするために、URL.createObjectURLを使用してファイルを読み込む
      const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      setEditedProfile((prev) => ({ ...prev, userImage: [...(prev.userImage || []), ...fileArray] }));
    } else {
      setEditedProfile((prev) => ({ ...prev, [name]: value }));
    }
    if (name === "location" && value.trim() !== "") {
      setIsLocationEditable(false); // 位置情報の編集を無効化
    }
  };
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "userImage" && e.target instanceof HTMLInputElement && e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      setEditedProfile((prev) => ({ ...prev, userImage: [...(prev.userImage || []), ...fileArray] }));
    } else {
      setEditedProfile((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "userImage" && e.target instanceof HTMLInputElement && e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      setEditedProfile((prev) => ({ ...prev, userImage: [...(prev.userImage || []), ...fileArray] }));
    } else {
      setEditedProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 画像を削除する関数
  const handleImageRemove = (index: number) => {
    if (!editedProfile.userImage) return;
    const filteredImages = editedProfile.userImage.filter((_, idx) => idx !== index);
    setEditedProfile((prev) => ({ ...prev, userImage: filteredImages }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editedProfile.userId) {
      console.error("ユーザーIDがありません。");
      return;
    }

    try {
      // editedProfileには、ユーザーがフォームで入力したプロファイル情報が含まれています。
      // ここでは、editedProfileの情報をもとにデータベースを更新します。
      const result = await updateProfile(editedProfile.userId, {
        userId: editedProfile.userId,
        userName: editedProfile.userName,
        bio: editedProfile.bio,
        userImage: editedProfile.userImage?.join(","), // userImageがstring[]型なので、stringに変換
        favoriteSpot: editedProfile.favoriteSpot,
        location: editedProfile.location,
      });

      if (result) {
        console.log("プロファイルが更新されました。", result);
        onClose(); // 更新が成功したらモーダルを閉じる
        window.location.reload();
      } else {
        console.error("プロファイルの更新に失敗しました。");
      }
    } catch (error) {
      console.error("データベースの更新中にエラーが発生しました。", error);
    }
  };

  // モーダルを表示しない場合は null を返す
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="w-[800px] h-[600px] bg-white p-8 rounded overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">プロファイル編集</h2>
          <button onClick={onClose} className="text-xl">
            ✖️
          </button>
        </div>
        <input
          type="file"
          multiple
          accept="image/jpeg, image/png"
          onChange={handleInputChange}
          name="userImage"
          ref={inputRef}
          style={{ marginBottom: "1rem" }}
        />
        <div className="flex space-x-4 overflow-x-auto py-4">
          {editedProfile.userImage?.map((image, idx) => (
            <div key={idx} className="relative">
              <img src={image} alt={`プレビュー ${idx}`} className="w-32 h-32" />
              <button
                type="button"
                className="absolute top-0 right-0 bg-red-500 text-white"
                onClick={() => handleImageRemove(idx)}
              >
                ☓
              </button>
            </div>
          ))}
        </div>
        {/* その他の入力フィールドのコード */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">ユーザー名:</label>
              <input
                type="text"
                name="userName"
                value={editedProfile.userName || ""}
                onChange={handleTextAreaChange}
                className="w-full p-2 border rounded"
                disabled={!isLocationEditable}
              />
            </div>
            <div>
              <label className="block mb-2">一言:</label>
              <textarea
                aria-label="一言"
                name="bio"
                value={editedProfile.bio || ""}
                onChange={handleTextAreaChange}
                className="w-full p-2 border rounded"
              />
            </div>
            {/* <div>
              <label className="block mb-2">画像URL:</label>
              <input
                type="text"
                name="userImage"
                value={editedProfile.userImage || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div> */}
            <div>
              <label className="block mb-2">おすすめスポット:</label>
              <textarea
                aria-label="おすすめスポット"
                name="favoriteSpot"
                value={editedProfile.favoriteSpot || ""}
                onChange={handleTextAreaChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-2">位置情報:</label>
              {/* <input
                id="location"
                type="text"
                name={profile.location}
                value={editedProfile.location || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                disabled={!isLocationEditable}
              /> */}
              <select
                name="location"
                value={editedProfile.location || ""}
                onChange={handleSelectChange}
                className="w-full p-2 border rounded"
              >
                <option value="">地元を選択</option>
                {prefectures.map((prefecture) => (
                  <option key={prefecture} value={prefecture}>
                    {prefecture}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-sm text-red-400">注意：位置情報は一度選択すると変更できません</div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            更新
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
