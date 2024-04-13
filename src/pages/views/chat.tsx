import React, { useContext, useEffect, useState, FormEvent } from "react";
import { UserContext } from "../../hooks/UserProvider";
import {
  getPostMessages,
  postMessage,
  getSendMessages,
} from "../../utils/chat";

interface Message {
  sender_id: string;
  content: string;
  type: "sent" | "received"; // 送信されたメッセージか受信したメッセージかを区別するためのタイプ
}

export const Chat = () => {
  const [content, setContent] = useState<string>("");
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (content.trim() === "") return;

    await postMessage({
      receiver_id: "7b01d1da-9d68-4dbb-8108-70802d0992cc",
      sender_id: user.id,
      content,
    });
    setContent("");
    refreshMessages(); // 新しいメッセージを送信した後、メッセージリストを更新します
  };

  const refreshMessages = async () => {
    if (user.id) {
      const sentData = await getPostMessages({ user_id: user.id });
      const receivedData = await getSendMessages({ user_id: user.id });

      const formattedSent = sentData
        ? sentData.map((msg) => ({ ...msg, type: "sent" }))
        : [];
      const formattedReceived = receivedData
        ? receivedData.map((msg) => ({ ...msg, type: "received" }))
        : [];

      const allMessages = [
        ...formattedSent,
        ...formattedReceived,
      ].sort(/* ここでタイムスタンプに基づいてソートするロジックが必要 */);
      setMessages(allMessages);
    }
  };

  useEffect(() => {
    refreshMessages();
  }, [user.id]); // user.idが変更された場合にのみ再読み込み

  return (
    <div className="text-center">
      <div className="flex flex-col items-center w-full">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat ${
              msg.type === "sent" ? "chat-start" : "chat-end"
            } w-4/5 my-2`}
          >
            <div className="chat-bubble">{msg.content}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="mt-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea textarea-bordered textarea-lg w-full max-w-xs"
        ></textarea>
        <button className="btn btn-neutral mt-2" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};
