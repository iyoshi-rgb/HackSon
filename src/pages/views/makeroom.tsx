import { useEffect, useState } from "react";
import { createChatRoom } from "../../utils/makeroom";
import { getUser } from "../../utils/user";
import { useNavigate } from "react-router-dom";

export const Makeroom = () => {
  const navigate = useNavigate();
  let createRoomData: any;

  const [userId, setUserId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const userData = await getUser();
      if (userData) {
        setUserId(userData.userId);
      } else {
        setUserId(null);
      }
    }

    fetchUser();
  }, []);

  const handleCreateRoom = async () => {
    createRoomData = await createChatRoom(userId, title, about, location);
    setTitle("");
    setAbout("");
    setLocation("");
    console.log(createRoomData);
    if (createRoomData && createRoomData.length > 0) {
      const ChatRoomID = createRoomData[0].ChatRoomID;
      navigate(`/room?ChatRoomID=${ChatRoomID}`);
    } else {
      console.error("No data returned or room creation failed");
    }
  };

  return (
    <>
      <div className="text-2xl font-bold text-center my-10">
        募集部屋の新規作成
      </div>
      <form className="max-w-md max-h-md mx-auto my-10 bg-white p-8 rounded-sm shadow-lg ">
        <div className="mb-4">
          <input
            type="text"
            placeholder="部屋のタイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="概要"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <div className="mb-4">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="select select-bordered w-full"
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
        </div>
        <button
          type="button"
          onClick={handleCreateRoom}
          className="btn bg-blue-700 text-white w-full hover:border-blue-700 hover:text-blue-700 hover:bg-white"
        >
          募集部屋を作成する
        </button>
      </form>
    </>
  );
};
