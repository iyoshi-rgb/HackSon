import React, { useEffect, useState } from "react";
import { getUser } from "../../utils/user";
import {
  getChatRoomIds,
  getMyChatRooms,
  getChatRoomsByLocation,
} from "../../utils/viewroom";

export const Roomlist = () => {
  const [chatRoomIds, setChatRoomIds] = useState<number[]>([]);
  const [myChatRooms, setMyChatRooms] = useState<any[]>([]);
  const [chatRoomsByLocation, setChatRoomsByLocation] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchChatRoomIds = async () => {
      const user = await getUser();
      setUserId(user?.userId ?? null);

      if (user?.userId) {
        // Optional chaining for safer access
        const roomIds = await getChatRoomIds(user.userId);
        const myRooms = await getMyChatRooms(user.userId);
        const roomsByLocation = await getChatRoomsByLocation("東京都"); // Example static location
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

    fetchChatRoomIds(); // Properly call the function inside the effect
  }, []); // Empty dependency array to run only on component mount

  return (
    <>
      <div>Room List</div>
      <h2>参加している募集部屋</h2>
      <ul>
        {chatRoomIds.map((chatRoomId) => (
          <li key={chatRoomId}>{chatRoomId}</li>
        ))}
      </ul>
      <h2>自分が作成した部屋</h2>
      <ul>
        {myChatRooms.map((room) => (
          <li key={room.ChatRoomID}>{room.Title}</li>
        ))}
      </ul>
      <h2>東京の部屋</h2>
      <ul>
        {chatRoomsByLocation.map((room) => (
          <li key={room.ChatRoomID}>{room.Title}</li>
        ))}
      </ul>
    </>
  );
};
