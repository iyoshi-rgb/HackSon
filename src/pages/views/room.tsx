import { useLocation } from "react-router";
import { getMessage, makemessage } from "../../utils/makemessage";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../hooks/UserProvider";

export const Room = () => {

  const [messageToSend, setMessageToSend] = useState<string>("");
  const [message, setMessage] = useState<any>([]);
  const { user } = useContext(UserContext);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ChatRoomID = queryParams.get("ChatRoomID");
  

  useEffect(()  => {
    async function fechtchat(){
      if(ChatRoomID){
      const data = await getMessage(Number(ChatRoomID));
      console.log(ChatRoomID)
      console.log("data",data);
      if(data){
        setMessage(data)
      }else{
        return;
      }

      }
    } 
    fechtchat();
    console.log("user:",message)



  }, []);

  const handleSendMessage = async (e:any) => {
    e.preventDefault(); // フォームのデフォルト送信動作を防止

    const constent = e.target.elements.messageInput.value; // inputのname属性を使用して値にアクセス
    console.log(constent); // ここでメッセージを処理（例えばサーバーに送信）
    if(ChatRoomID){
      const result = await makemessage(user.id,constent,Number(ChatRoomID));
      console.log(result)
      
      const data = await getMessage(Number(ChatRoomID));
      setMessage(data)
      console.log("message",message);
    }

    console.log(message)

    
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
