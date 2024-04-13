import { supabase } from "./supabase";

// チャットルームにユーザーを登録する関数
export const joinChatRoom = async (userId: string, chatRoomId: string) => {
  const { data, error } = await supabase
    .from("ChatRoomMembers")
    .insert([
      {
        ChatRoomID: chatRoomId,
        UserID: userId,
      },
    ])
    .select();
  console.log("Join Chat Room data", data);

  if (error) {
    console.error("Error joining chat room", error);
    return false;
  }
  return data;
};
