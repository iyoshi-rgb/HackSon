import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { getMessage, makemessage } from "../../utils/makemessage";

interface Messages {
  UserID: string;
  Message: string;
  MessageID: number;
  ChatRoomID: number;
  Timestamp: Date;
}

export const Chat = () => {
  const props_ChatRoomID = 1;
  const props_UserID = "1";
  const [messageToSend, setMessageToSend] = useState<string>("");
  const [message, setMessage] = useState<any>([]);

  useEffect(()  => {
    async function fechtchat(){
      const data = await getMessage();
      setMessage(data)
      
      console.log("user:",message)
      
    } 
    fechtchat();


  }, []);

  const handleSendMessage = async (e:any) => {
    e.preventDefault(); // フォームのデフォルト送信動作を防止
    const message = e.target.elements.messageInput.value; // inputのname属性を使用して値にアクセス
    console.log(message); // ここでメッセージを処理（例えばサーバーに送信）

    await makemessage(props_UserID,message,props_ChatRoomID);
    const data = await getMessage();
    setMessage(data)
    console.log("message",message);

    
  };

  return (
    <div>
      <ul>
        {message.map((mes : any, index:number) => (
          <li key={index}>{mes.Message}</li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
      <input
        type="text"
        name="messageInput"
        value={messageToSend}
        onChange={(e) => setMessageToSend(e.target.value)}
      />
      <button type="submit">送信</button>
    </form>
    </div>
  );
};
