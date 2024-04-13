import { supabase } from "./supabase";

//テスト用
export const fetchTest = async () => {
  const item = await supabase.from("test").select("*");
  return item.data;
};

export async function CreateChatRoomFunc(
  userID: string,
  title: string,
  about: string,
  chatRoomType: string,
  location: string
) {
  // 仮データ
  //   const userID = 1;
  //   const title = "穴場の居酒屋について";
  //   const about = "安くてたくさん飲める居酒屋を探しています";
  //   const chatRoomType = "group";

  const createRoomData = await createChatRoom(
    userID,
    title,
    about,
    chatRoomType,
    location
  );
  console.log("Created Room:", createRoomData);
}
