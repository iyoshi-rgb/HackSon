import React from "react";
import { CreateChatRoomFunc } from "../../utils/login";

export const Makeroom = () => {
  return (
    <>
      <div>makeroom</div>
      <button onClick={CreateChatRoomFunc}> ダミーデータを作成する</button>
    </>
  );
};
