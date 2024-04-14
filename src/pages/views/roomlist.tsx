import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 型のインポートを省略し、必要な関数もany型とする
import { getUser, getLocation } from "../../utils/user";
import {
  getChatRoomDetailsByUserId,
  getMyChatRooms,
  getChatRoomsByLocation,
} from "../../utils/viewroom";
import { joinChatRoom } from "../../utils/joinroom";

export const RoomList: React.FC = () => {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState<any>("");
  const [chatRoomNames, setChatRoomNames] = useState<any[]>([]);
  const [chatRoomsByLocation, setChatRoomsByLocation] = useState<any[]>([]);
  const [userId, setUserId] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const user: any = await getUser();
      if (user && user.userId) {
        setUserId(user.userId);
        const location: any = await getLocation(user.userId);
        if (location?.length > 0 && location[0].Location) {
          setUserLocation(location[0].Location);
        }

        const roomDetails: any = await getChatRoomDetailsByUserId(user.userId);
        if (roomDetails) {
          const roomNames: any = roomDetails
            .map((room: any) => room.Title)
            .filter((title: any) => !!title);
          setChatRoomNames(roomNames);
        }

        if (userLocation) {
          const roomsByLocation: any = await getChatRoomsByLocation(
            userLocation,
            user.userId
          );
          setChatRoomsByLocation(roomsByLocation);
        }
      }
    };

    fetchData();
  }, [userId, userLocation]);

  const handleJoinRoom = async (chatRoomId: any): Promise<void> => {
    if (userId) {
      const data: any = await joinChatRoom(userId, chatRoomId);
      if (data) {
        navigate(`/room/${chatRoomId}`);
      } else {
        alert("Failed to join the room");
      }
    }
  };

  if (!userLocation) {
    return <div>地元を登録してください。</div>;
  }

  const filteredChatRooms = chatRoomsByLocation.filter(
    (room: any) => !chatRoomNames.includes(room.Title)
  );

  return (
    <>
      <div className="text-2xl font-bold text-center my-5">募集中の部屋</div>
      <h2 className="text-lg font-semibold text-center my-10">
        {userLocation} の 部屋
      </h2>
      <div className="flex justify-center">
        <ul className="space-y-4">
          {filteredChatRooms.length === 0 && (
            <div className="text-center text-base font-semibold ">
              現在募集中の部屋はありません
            </div>
          )}
          {filteredChatRooms.map((room: any) => (
            <li key={room.ChatRoomID}>
              <div className="card w-96 bg-base-100 shadow-md rounded-lg">
                <div className="card-body">
                  <h3
                    className="card-title clickable text-base"
                    onClick={() => navigate(`/room/${room.ChatRoomID}`)}
                  >
                    {room.Title}
                  </h3>
                  <p className="text-xs">{room.About}</p>
                  <button onClick={() => handleJoinRoom(room.ChatRoomID)}>
                    Join
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
