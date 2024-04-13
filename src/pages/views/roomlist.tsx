import React, { useEffect, useState } from "react";
import { getUser } from "../../utils/user";
import { getLocation } from "../../utils/user";
import { useNavigate } from "react-router-dom";

import {
  getChatRoomIds,
  getMyChatRooms,
  getChatRoomsByLocation,
} from "../../utils/viewroom";
import { joinChatRoom } from "../../utils/joinroom";

export const Roomlist = () => {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState<string>("");
  const [chatRoomIds, setChatRoomIds] = useState<number[]>([]);
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
        const roomIds = await getChatRoomIds(userId);
        const myRooms = await getMyChatRooms(userId);
        const roomsByLocation = await getChatRoomsByLocation(userLocation);

        if (roomIds) {
          setChatRoomIds(roomIds);
          console.log("roomIds", roomIds);
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

  return (
    <>
      <div>Room List</div>
      <h2>参加している募集部屋</h2>
      {/* <ul>
        {chatRoomIds.map((chatRoom) => (
          <li key={chatRoom}>
            <button>{chatRoom}</button>
          </li>
        ))}
      </ul> */}
      <h2>自分が作成した部屋</h2>
      <ul>
        {myChatRooms.map((room) => (
          <li key={room.ChatRoomID}>
            <button>{room.Title}</button>
          </li>
        ))}
      </ul>
      <h2>{userLocation}の部屋</h2>
      <ul>
        {chatRoomsByLocation.map((room) => (
          <li key={room.ChatRoomID}>
            <button>{room.Title}</button>
            <button onClick={() => handleJoinRoom(room.ChatRoomID)}>
              参加する
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
