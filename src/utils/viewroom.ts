import { supabase } from "./supabase";

export const getChatRoomDetailsByUserId = async (userID: string) => {
  // ユーザーIDに基づいてチャットルームIDを取得
  const { data: roomIdsData, error: roomIdsError } = await supabase
    .from("ChatRoomMembers")
    .select("ChatRoomID")
    .eq("UserID", userID);

  if (roomIdsError) {
    console.error("Error fetching ChatRoomID", roomIdsError);
    return null;
  }

  if (!roomIdsData || roomIdsData.length === 0) {
    console.log("No chat rooms found for this user.");
    return [];
  }

  // 取得したチャットルームIDを使用して、チャットルームの詳細情報を取得
  const roomDetails = await Promise.all(
    roomIdsData.map(async (item) => {
      const { data: detailsData, error: detailsError } = await supabase
        .from("ChatRooms")
        .select("Title, About")
        .eq("ChatRoomID", item.ChatRoomID)
        .single(); // ChatRoomIDはユニークなのでsingleを使用

      if (detailsError) {
        console.error(
          `Error fetching details for ChatRoomID ${item.ChatRoomID}:`,
          detailsError
        );
        return null;
      }
      console.log("Room details", detailsData);

      return detailsData; // チャットルームの詳細データを返す
    })
  );

  return roomDetails.filter((detail) => detail !== null); // nullを除外して返す
};

export const getMyChatRooms = async (userID: string) => {
  const { data, error } = await supabase
    .from("ChatRooms")
    .select("*")
    .eq("UserID", userID)
    .select();

  console.log("getMyChatRooms", data);

  if (error) {
    console.error("Error fetching chat rooms by UserID", error);
    return null;
  }
  return data;
};

export const getChatRoomsByLocation = async (location: string) => {
  const { data, error } = await supabase
    .from("ChatRooms")
    .select("*")
    .eq("Location", location)
    .select();

  console.log("getChatRoomsByLocation", data);
  if (error) {
    console.error("Error fetching chat rooms by location", error);
    return null;
  }

  return data;
};
