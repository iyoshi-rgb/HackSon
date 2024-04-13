import React, { useContext, useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { UserContext } from "../../hooks/UserProvider";

export const Chat = () => {
  const [content, setContent] = useState("");
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState<any>([]);

  const handleSend = async () => {
    const { data, error } = await supabase.from("Messages").insert([
      {
        sender_id: "7b01d1da-9d68-4dbb-8108-70802d0992cc",
        receiver_id: user.id,
        content: content,
      },
    ]);

    if (error) console.log("Error sending message:", error);
    else {
      console.log("Message sent:", data);
      setContent("");
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("Messages")
        .select("*")
        .eq("receiver_id", user.id);

      if (error) console.log("Error fetching messages:", error);
      else setMessages(data);
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <div>
        {user.id}
        {user.name}
        {messages.map((msg: any, idx: any) => (
          <div key={idx}>
            <strong>From: {msg.sender_id}</strong>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};
