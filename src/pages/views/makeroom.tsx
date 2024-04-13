import { useEffect, useState } from "react";
import { CreateChatRoomFunc } from "../../utils/supabasefunction";
import { getUser } from "../../utils/supabasefunction";

export const Makeroom = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [chatRoomType, setChatRoomType] = useState("group");
  const [location, setLocation] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const userId = await getUser();
      setUserId(userId);
    }

    fetchUser();
  }, []);

  const handleCreateRoom = () => {
    console.log(userId, title, about, chatRoomType, location);
    CreateChatRoomFunc(userId, title, about, chatRoomType, location);
  };

  console.log(userId);

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
