import { useState } from "react";
import { CreateChatRoomFunc } from "../../utils/supabasefunction";

export const Makeroom = () => {
  // フォームの状態を管理するための state フック
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [chatRoomType, setChatRoomType] = useState("group"); // 初期値を 'group' とする
  const [location, setLocation] = useState("");

  const handleCreateRoom = () => {
    CreateChatRoomFunc(userID, title, about, chatRoomType, location);
  };
  const userID = "1";
  return (
    <>
      <div>makeroom</div>
      <form>
        <input
          type="text"
          placeholder="部屋のタイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="概要"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
        <select
          value={chatRoomType}
          onChange={(e) => setChatRoomType(e.target.value)}
        >
          <option value="group">グループ</option>
          <option value="personal">個人</option>
        </select>
        <input
          type="text"
          placeholder="地元"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="button" onClick={handleCreateRoom}>
          ダミーデータを作成する
        </button>
      </form>
    </>
  );
};
