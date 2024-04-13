import React, { useState, useEffect } from "react";

// プロファイル情報の型定義
interface ProfileProps {
  userId: string;
  userName?: string;
  bio?: string;
  userImage?: string;
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

  // 親コンポーネントから渡されたプロファイル情報でフォームを初期化
  useEffect(() => {
    setEditedProfile(profile);
  }, [profile]);

  // フォームの入力値が変更されたときのハンドラ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onUpdate(editedProfile);
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">ユーザー名:</label>
              <input
                type="text"
                name="userName"
                value={editedProfile.userName || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">一言:</label>
              <input
                type="text"
                name="bio"
                value={editedProfile.bio || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">画像URL:</label>
              <input
                type="text"
                name="userImage"
                value={editedProfile.userImage || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">おすすめスポット:</label>
              <input
                type="text"
                name="favoriteSpot"
                value={editedProfile.favoriteSpot || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-2">位置情報:</label>
              <input
                type="text"
                name="location"
                value={editedProfile.location || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            更新
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
