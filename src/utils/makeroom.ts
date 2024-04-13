import { supabase } from "./supabase";

// チャットルームを作成し、その結果を返す関数
export const createChatRoom = async (
  userID: string | null,
  title: string,
  about: string,
  location: string
) => {
  const { data, error } = await supabase
    .from("ChatRooms")
    .insert([
      {
        UserID: userID,
        Title: title,
        About: about,
        Location: location,
        CreatedAt: new Date(),
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
