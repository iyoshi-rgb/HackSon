import React, { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabase'

interface Messages{
  UserID:String,
  Message:String,
  MessageID:Number,
  ChatRoomID:Number,
  Timestamp:Date,
}

export const Chat = () => {

  const [message,setMessage] = useState<Messages[]>([])

  const fetchMessage = async () => {
    const messages = (await supabase.from("Messages").select("*")).data;
    if(!messages){
      setMessage([])
    }else{
    setMessage(messages);}
  };

  useEffect(() => {
    fetchMessage()
  },[])
  
  return (
    <div>
      <ul>
        {message.map((mes,index)=>(
          <li>{mes.Message}</li>
        ))}
      </ul>
    </div>
  )
}
