import { useLocation } from "react-router";
import { getUsersByChatRoomId } from "../../utils/user";
import { useEffect, useState } from "react";
import { UseUserIdContext } from "../../hooks/UserIdProvider";
import { useNavigate } from "react-router-dom";

export const Room = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ChatRoomID = Number(queryParams.get("ChatRoomID"));
  const [joinUsersId, setJoinUsersId] = useState<any[]>();
  const { receiverUserID, setReceiverUserID } = UseUserIdContext(); //

  useEffect(() => {
    async function fetchJoinUsersData() {
      if (ChatRoomID) {
        const joinUsersData = await getUsersByChatRoomId(ChatRoomID);
        setJoinUsersId(joinUsersData);
        console.log("Join users data", joinUsersData);
      }
    }

    fetchJoinUsersData();
  }, [ChatRoomID]);

  const handleSelectUserId = (userId: string) => {
    console.log("Selected UserID:", userId);
    setReceiverUserID(userId);
    navigate(`/chat`);
  };
  return (
    <>
      <div className="text-2xl font-bold text-center my-4">Room</div>
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-center my-10">
            参加しているユーザー
          </h2>
          <div className="flex justify-center my-5">
            <ul className="space-y-4">
              {joinUsersId &&
                joinUsersId.map((user) => (
                  <li key={user.UserID}>
                    <div className="card w-96 bg-base-100 shadow-md rounded-lg">
                      <div className="card-body">
                        <h3
                          className="card-title text-base cursor-pointer"
                          onClick={() => handleSelectUserId(user.UserID)}
                        >
                          {user.UserID}
                        </h3>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
