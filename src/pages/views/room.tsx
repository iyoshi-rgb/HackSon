import { useLocation } from "react-router";
import { getMessage, makemessage } from "../../utils/makemessage";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../hooks/UserProvider";
import { getUsersByChatRoomId } from "../../utils/user";
import { UseUserIdContext } from "../../hooks/UserIdProvider";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../utils/login";

export const Room = () => {
  const [sendMessage, setSendMessage] = useState<string>("");
  const [message, setMessage] = useState<any[]>([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ChatRoomID = Number(queryParams.get("ChatRoomID"));
  const [joinUsersId, setJoinUsersId] = useState<any[]>();
  const [joinUsersProfiles, setJoinUsersProfiles] = useState<any[]>([]);

  const { receiverUserID, setReceiverUserID } = UseUserIdContext(); //

  useEffect(() => {
    async function fechtchat() {
      if (user) {
        if (ChatRoomID) {
          const data = await getMessage(Number(ChatRoomID));
          if (data) {
            setMessage(data);
            console.log("data", message);
          } else {
            return;
          }
        }
      } else {
      }
    }
    fechtchat();

    const fetchJoinUsersData = async () => {
      if (ChatRoomID) {
        const joinUsersData = await getUsersByChatRoomId(ChatRoomID);
        setJoinUsersId(joinUsersData); // ユーザーIDを状態に保存
        console.log("Join users data", joinUsersData);

        if (joinUsersData && joinUsersData.length > 0) {
          // 各ユーザーIDに対してプロフィール情報を非同期で取得
          const profiles = await Promise.all(
            joinUsersData.map((userId) => getProfile(userId))
          );

          // nullでないプロフィールのみをフィルタリングして保存
          const validProfiles = profiles.filter((profile) => profile !== null);
          setJoinUsersProfiles(validProfiles);
          console.log("Profiles fetched:", validProfiles);
        }
      }
    };
    fetchJoinUsersData();
  }, [ChatRoomID]);

  const handleSendMessage = async (e: any) => {
    e.preventDefault(); // フォームのデフォルト送信動作を防止

    const message = e.target.elements.messageInput.value; // inputのname属性を使用して値にアクセス
    console.log(message); // ここでメッセージを処理（例えばサーバーに送信）
    if (ChatRoomID) {
      const result = await makemessage(user.id, message, Number(ChatRoomID));
      console.log(result);
      const data = await getMessage(Number(ChatRoomID));
      setMessage(data);
      console.log("message", message);
    }
  };
  const handleSelectUserId = (userId: string) => {
    console.log("Selected UserID:", userId);
    setReceiverUserID(userId);
    navigate(`/chat`);
  };

  return (
    <div className="text-center">
      <div className="flex flex-col items-center w-full">
        <div className="text-2xl font-bold text-center my-4">Room</div>
        {message.map((mes: any, index: number) => (
          // eslint-disable-next-line eqeqeq
          <div
            className={`chat ${
              user.id === mes.UserID ? "chat-end" : "chat-start"
            } w-4/5 `}
            key={index}
          >
            {mes.Message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="mt-4">
        <textarea
          name="messageInput"
          value={sendMessage}
          onChange={(e) => setSendMessage(e.target.value)}
          className="textarea textarea-bordered textarea-lg w-full max-w-xs"
        />
        <button className="btn btn-neutral mt-2" type="submit">
          Send
        </button>
      </form>
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-center my-10">
            参加しているユーザー
          </h2>
          <div className="flex justify-center my-5">
            <ul className="space-y-4">
              {joinUsersProfiles &&
                joinUsersProfiles.map((profile) => (
                  <li key={profile.UserID}>
                    <div className="card w-96 bg-base-100 shadow-md rounded-lg">
                      <div className="card-body">
                        <h3
                          className="card-title text-base cursor-pointer"
                          onClick={() => handleSelectUserId(profile.UserID)}
                        >
                          {profile.UserName ? profile.UserName : profile.UserId}
                        </h3>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
