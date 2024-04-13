import { supabase } from "./supabase";

export const makemessage = async (
    userID:String,
    message:String,
    chatRoomID:Number,
) =>{
    const { data, error } = await supabase
    .from("Messages")
    .insert([
      {
        UserID: userID,
        Message:message,
        ChatRoomID:chatRoomID,
      },
    ])
    .select();

  // エラーチェック
  if (error) {
    console.error("Error inserting data", error);
    return null;
  }

  return data;
};

export const getMessage = async (id:number) => {
    const messages = (
      await supabase
        .from("Messages")
        .select("*")
        .eq("ChatRoomID",id)
    )
    return messages.data;
  };
