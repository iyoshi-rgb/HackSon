
import { useEffect, useState } from "react";
import { createChatRoom } from "../../utils/makeroom";
import { getUser } from "../../utils/user";
import { useNavigate } from "react-router-dom";

export const Makeroom = () => {
  const navigate = useNavigate();
  let createRoomData: any;

  const [userID, setUserId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [chatRoomType, setChatRoomType] = useState("group");
  const [location, setLocation] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const userData = await getUser();
      if (userData) {
        setUserId(userData.userId); // userが存在する場合、userIdを設定
      } else {
        setUserId(null); // userがnullの場合、userIdをnullに設定
      }
    }

    fetchUser();
  }, []);

  const handleCreateRoom = async () => {
    // console.log(userId, title, about, chatRoomType, location);
    createRoomData = await createChatRoom(
      userId,
      title,
      about,
      chatRoomType,
      location
    );
    setTitle("");
    setAbout("");
    setChatRoomType("group");
    setLocation("");
    console.log(createRoomData);
    if (createRoomData && createRoomData.length > 0) {
      const ChatRoomID = createRoomData[0].ChatRoomID;
      // 作成したルームに遷移
      navigate(`/room?ChatRoomID=${ChatRoomID}`);
    } else {
      console.error("No data returned or room creation failed");

    }
  };

  return (
    <>
      <div>makeroom</div>
      <form>
        <input type="text" placeholder="部屋のタイトル" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="概要" value={about} onChange={(e) => setAbout(e.target.value)} />
        <select value={chatRoomType} onChange={(e) => setChatRoomType(e.target.value)}>
          <option value="group">グループ</option>
          <option value="personal">個人</option>
        </select>
        <input type="text" placeholder="地元" value={location} onChange={(e) => setLocation(e.target.value)} />
        <button type="button" onClick={handleCreateRoom}>
          ダミーデータを作成する
        </button>
      </form>
    </>
  );
};
