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
    e.preventDefault();

    const message = e.target.elements.messageInput.value;
    console.log(message);
    if (ChatRoomID) {
      const result = await makemessage(user.id, message, Number(ChatRoomID));
      console.log(result);
      const data = await getMessage(Number(ChatRoomID));
      setMessage(data);
    }
  };
  const handleSelectUserId = (userId: string) => {
    // console.log("Selected UserID:", userId);
    setReceiverUserID(userId);
    navigate(`/chat?userID=${userId}`);
  };

  return (
    <div className="flex h-full">
      <div className="w-1/4 bg-gray-100 p-4 h-full overflow-y-auto">
        <div className="text-xl font-bold">ユーザー一覧</div>
        <ul className="space-y-2 mt-4">
          {joinUsersProfiles &&
            joinUsersProfiles.map((profile) => (
              <li
                key={profile.UserId}
                className="card bg-base-100 rounded-lg p-2"
              >
                <h3
                  className="cursor-pointer"
                  onClick={() => handleSelectUserId(profile.UserId)}
                >
                  {profile.UserName ? profile.UserName : profile.UserId}
                </h3>
              </li>
            ))}
        </ul>
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="text-2xl font-bold text-center">Room</div>
          {message.map((mes: any, index: number) => (
            <div
              className={`chat ${
                user.id === mes.UserID ? "chat-end" : "chat-start"
              } w-4/5 mx-auto my-2 bg-white rounded-lg p-2 shadow`}
              key={index}
            >
              {mes.Message}
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSendMessage}
          className="sticky bottom-0 p-4 bg-white shadow-lg w-full flex items-center"
        >
          <textarea
            name="messageInput"
            value={sendMessage}
            onChange={(e) => setSendMessage(e.target.value)}
            className="textarea textarea-bordered textarea-sm w-3/5 mx-20"
          ></textarea>
          <button
            className="btn btn-primary bg-blue-700 text-white rounded-m hover:bg-white hover:text-blue-700 hover:border-blue-700 hover:border-2 "
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
