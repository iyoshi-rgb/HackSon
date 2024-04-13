import React, { useEffect, useState } from "react";
import { getUser } from "../../utils/user";
import { getLocation } from "../../utils/user";
import {
  getChatRoomIds,
  getMyChatRooms,
  getChatRoomsByLocation,
} from "../../utils/viewroom";

export const Roomlist = () => {
  const [userLocation, setUserLocation] = useState<string>("東京都");
  const [chatRoomIds, setChatRoomIds] = useState<number[]>([]);
  const [myChatRooms, setMyChatRooms] = useState<any[]>([]);
  const [chatRoomsByLocation, setChatRoomsByLocation] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      const user = await getUser();
      if (user?.userId) {
        const location = await getLocation(user.userId);
        if (location) {
          setUserLocation(location[0].Location);
        }
      }
    };

    const fetchChatRoomIds = async () => {
      const user = await getUser();
      setUserId(user?.userId ?? null);

      if (userId) {
        // Optional chaining for safer access
        const roomIds = await getChatRoomIds(userId);
        const myRooms = await getMyChatRooms(userId);
        const roomsByLocation = await getChatRoomsByLocation(userLocation); // Example static location
        if (roomIds) {
          setChatRoomIds(roomIds);
        }
        if (myRooms) {
          setMyChatRooms(myRooms);
        }
        if (roomsByLocation) {
          setChatRoomsByLocation(roomsByLocation);
        }
      }
    };

    fetchChatRoomIds();
    fetchLocation();
  }, []);
  return (
    <>
      <div>Room List</div>
      <h2>参加している募集部屋</h2>
      <ul>
        {chatRoomIds.map((chatRoomId) => (
          <li key={chatRoomId}>
            <button>{chatRoomId}</button>
          </li>
        ))}
      </ul>
      <h2>自分が作成した部屋</h2>
      <ul>
        {myChatRooms.map((room) => (
          <li key={room.ChatRoomID}>
            <button>{room.Title}</button>
          </li>
        ))}
      </ul>
      <h2>東京の部屋</h2>
      <ul>
        {chatRoomsByLocation.map((room) => (
          <li key={room.ChatRoomID}>
            <button>{room.Title}</button>
          </li>
        ))}
      </ul>
    </>
  );
};
