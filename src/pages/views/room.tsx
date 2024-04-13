import { useLocation } from "react-router";
import { getMessage, makemessage } from "../../utils/makemessage";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../hooks/UserProvider";

export const Room = () => {
  const [sendMessage, setSendMessage] = useState<string>("");
  const [message, setMessage] = useState<any[]>([]);
  const { user } = useContext(UserContext);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ChatRoomID = queryParams.get("ChatRoomID");

  useEffect(() => {
    async function fechtchat() {
      if (user) {
        if (ChatRoomID) {
          const data = await getMessage(Number(ChatRoomID));

          if (data) {
            setMessage(data);
            console.log("data", message);
          } else {
            return;
          }
        }
      } else {
      }
    }
    fechtchat();
  }, []);

  const handleSendMessage = async (e: any) => {
    e.preventDefault(); // フォームのデフォルト送信動作を防止

    const message = e.target.elements.messageInput.value; // inputのname属性を使用して値にアクセス
    console.log(message); // ここでメッセージを処理（例えばサーバーに送信）
    if (ChatRoomID) {
      const result = await makemessage(user.id, message, Number(ChatRoomID));
      console.log(result);
      const data = await getMessage(Number(ChatRoomID));
      setMessage(data);
      console.log("message", message);
    }
  };

  return (
    <div className="text-center">
      <div className="flex flex-col items-center w-full">
        {message.map((mes: any, index: number) => (
          // eslint-disable-next-line eqeqeq
          <div
            className={`chat ${
              user.id === mes.UserID ? "chat-end" : "chat-start"
            } w-4/5 `}
            key={index}
          >
            {mes.Message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="mt-4">
        <textarea
          name="messageInput"
          value={sendMessage}
          onChange={(e) => setSendMessage(e.target.value)}
          className="textarea textarea-bordered textarea-lg w-full max-w-xs"
        />
        <button className="btn btn-neutral mt-2" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};
