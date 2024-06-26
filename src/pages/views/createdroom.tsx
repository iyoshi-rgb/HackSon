import React, { useEffect, useState } from "react";
import { getUser } from "../../utils/user";
import { getLocation } from "../../utils/user";
import { useNavigate } from "react-router-dom";
import {
  getChatRoomDetailsByUserId,
  getMyChatRooms,
} from "../../utils/viewroom";

export const Createdroom = () => {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState<string>("");
  const [chatRoomDetails, setChatRoomDetails] = useState<any[]>([]);
  const [myChatRooms, setMyChatRooms] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      const user = await getUser();
      if (user?.userId) {
        const location = await getLocation(user.userId);
        if (location && location.length > 0 && location[0].Location) {
          setUserLocation(location[0].Location);
        }
      }
    };

    const fetchChatRoomIds = async () => {
      const user = await getUser();
      setUserId(user?.userId ?? null);

      if (userId) {
        const roomDetails = await getChatRoomDetailsByUserId(userId);
        if (roomDetails) {
          setChatRoomDetails(roomDetails);
        }
        const myRooms = await getMyChatRooms(userId);
        if (myRooms) {
          setMyChatRooms(myRooms);
        }
      }
    };

    fetchChatRoomIds();
    fetchLocation();
  }, [userId, userLocation]);

  if (!userLocation) {
    return <div>地元を登録してください。</div>;
  }
  console.log("chatRoomDetails", chatRoomDetails);
  return (
    <div>
      {" "}
      <h2 className="text-xl font-semibold text-center my-10">
        自分が作成した部屋
      </h2>
      <div className="flex justify-center">
        <ul className="space-y-4">
          {myChatRooms.map((room) => (
            <li key={room.ChatRoomID}>
              <div className="card w-96 bg-base-100 shadow-md rounded-lg">
                <div className="card-body">
                  <h3
                    className="card-title clickable text-base"
                    onClick={() =>
                      navigate(`/room?ChatRoomID=${room.ChatRoomID}`)
                    }
                  >
                    {room.Title}
                  </h3>
                  <p className="text-xs">{room.About}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
