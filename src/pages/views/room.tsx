import { useLocation } from "react-router";
import { getMessage, makemessage } from "../../utils/makemessage";
import { useContext, useEffect, useState } from "react";
import { getUser } from "../../utils/login";

export const Room = () => {
  const [sendMessage, setSendMessage] = useState<string>("");
  const [message, setMessage] = useState<any[]>([]);
  const { userId, setUserId } = useState<string>();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ChatRoomID = queryParams.get("ChatRoomID");

  useEffect(() => {
    async function fechtchat() {
      const user = await getUser();
      setUserId(user.userId);
      if (ChatRoomID) {
        const data = await getMessage(Number(ChatRoomID));

        if (data) {
          setMessage(data);
          console.log("data", data);
        } else {
          return;
        }
      }
    }
    fechtchat();
  }, []);

  const handleSendMessage = async (e: any) => {
    e.preventDefault(); // フォームのデフォルト送信動作を防止

    const message = e.target.elements.messageInput.value; // inputのname属性を使用して値にアクセス
    console.log(message); // ここでメッセージを処理（例えばサーバーに送信）
    if (ChatRoomID) {
      const result = await makemessage(userId, message, Number(ChatRoomID));
      console.log(userId);
      console.log(result);
      const data = await getMessage(Number(ChatRoomID));
      setMessage(data);
      console.log("message", message);
    }
  };

  return (
    <div>
      <div className="chat">
        {message.map((mes: any, index: number) => (
          // eslint-disable-next-line eqeqeq
          <div
            className={`chat ${
              userId === mes.UserID ? "chat-end" : "chat-start"
            }`}
            key={index}
          >
            {mes.Message}
            {user.id}
            {mes.UserID}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          name="messageInput"
          value={sendMessage}
          onChange={(e) => setSendMessage(e.target.value)}
        />
        <button type="submit">送信</button>
      </form>
    </div>
  );
};
