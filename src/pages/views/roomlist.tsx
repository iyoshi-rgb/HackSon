import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

interface Room {
  About:String
  ChatRoomID:Number
  ChatRoomType:String
  CreatedAt:Date
  Title:String
  UserID:Number
}

export const Roomlist = () => {
  const [roomList, setRoomList] = useState<Room[]>([]);



  const fetchRoom = async () => {
      const room = (await supabase.from("ChatRooms").select("*")).data;
      if (!room){
        setRoomList([])
      }else{
        setRoomList(room)
      }

console.log(roomList)
  };

  useEffect(() => {
    (async () => await fetchRoom())();
  },[]);



  return (
    <main className="container mx-auto">    
    <div className="flex items-center">
    <ul>
      {roomList.map((room,index)=>(
        <li>
          <div className="bg-white ">
            {room.Title}
            <br />
            {room.About}
          </div>
        </li>
      ))}
    </ul>
  </div>
  </main>
);

};
