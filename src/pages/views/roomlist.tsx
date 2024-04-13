import React, { useEffect, useState } from "react";

import { getUser } from "../../utils/user";
import { getLocation } from "../../utils/user";
import { useNavigate } from "react-router-dom";

import {
  getChatRoomDetailsByUserId,
  getMyChatRooms,
  getChatRoomsByLocation,
} from "../../utils/viewroom";
import { joinChatRoom } from "../../utils/joinroom";

export const Roomlist = () => {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState<string>("");
  const [chatRoomNames, setChatRoomNames] = useState<string[]>([]);
  const [myChatRooms, setMyChatRooms] = useState<any[]>([]);
  const [chatRoomsByLocation, setChatRoomsByLocation] = useState<any[]>([]);
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
        const myRooms = await getMyChatRooms(userId);
        const roomsByLocation = await getChatRoomsByLocation(userLocation);

        if (roomDetails) {
          // roomDetails から null を除外し、各部屋の Title を抽出して配列にする
          const roomNames = roomDetails
            .filter((room) => room !== null)
            .map((room) => (room ? room.Title : ""));
          setChatRoomNames(roomNames);
          console.log("roomName", roomNames);
        }
        if (myRooms) {
          setMyChatRooms(myRooms);
          console.log("myRooms", myRooms);
        }
        if (roomsByLocation) {
          setChatRoomsByLocation(roomsByLocation);
          console.log("roomsByLocation", roomsByLocation);
        }
      }
    };

    fetchChatRoomIds();
    fetchLocation();
  }, [userId, userLocation]);

  const handleJoinRoom = async (chatRoomId: string) => {
    if (userId) {
      const data = await joinChatRoom(userId, chatRoomId);
      if (data) {
        navigate(`/room?ChatRoomID=${chatRoomId}`);
      } else {
        alert("部屋への参加に失敗しました");
      }
    }
  };
  console.log("chatRoomNames", chatRoomNames);
  return (
    <>
      <div className="text-3xl font-bold text-center my-1">Room List</div>
      <h2 className="text-xl font-semibold text-center my-10">
        参加している募集部屋
      </h2>
      <div className="flex justify-center my-5">
        <ul className="space-y-4">
          {chatRoomNames &&
            chatRoomNames.map((chatRoomId) => (
              <li key={chatRoomId}>
                <div className="card w-96 bg-base-100 shadow-md rounded-lg">
                  <div className="card-body">
                    <h3 className="card-title text-base">
                      <button
                        onClick={() =>
                          navigate(`/room?ChatRoomID=${chatRoomId}`)
                        }
                      >
                        {chatRoomId}
                      </button>
                    </h3>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
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
      <h2 className="text-xl font-semibold text-center my-10">
        {userLocation}の部屋
      </h2>
      <div className="flex justify-center">
        <ul className="space-y-4">
          {chatRoomsByLocation.map((room) => (
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
                    参加する
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
