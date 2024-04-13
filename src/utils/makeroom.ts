import { supabase } from "./supabase";

export const createChatRoom = async (
  userID: number,
  title: string,
  about: string,
  chatRoomType: string
) => {
  const { data, error } = await supabase
    .from("ChatRooms")
    .insert([
      {
        UserID: userID,
        Title: title,
        About: about,
        ChatRoomType: chatRoomType,
        CreatedAt: new Date(),
      },
    ])
    .select();

  // エラーチェック
  if (error) {
    console.error("Error inserting data", error);
    return null;
  }

  // 挿入したデータの戻り値
  return data;
};
