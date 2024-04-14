import { supabase } from "./supabase";

export const makemessage = async (
    userID:string,
    message:string,
    chatRoomID:number,
) =>{
    const { data, error } = await supabase
    .from("GroupChat")
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

    return [];
  }

  return data;
};

export const getMessage = async (id:number) => {
    const {data} = 
      await supabase
        .from("GroupChat")
        .select("*")
        .eq("ChatRoomID",id)
    
    if(data){
        return data;
    }else {    
        return [];
     }
  };
