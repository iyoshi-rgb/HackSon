import { supabase } from "./supabase";

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const name = user?.user_metadata.name;

  if (user) {
    return { userId: user.id, userName: name };
  } else {
    return;
  }
}

export const getLocation = async (userID: string) => {
  const { data, error } = await supabase
    .from("Profile")
    .select("Location")
    .eq("UserId", userID)
    .select();

  if (error) {
    console.error("Error fetching location by UserID", error);
    return null;
  }
  console.log("Location data", data);
  return data ? data : null;
};

export async function getUsersByChatRoomId(chatRoomId: number) {
  try {
    const { data, error } = await supabase
      .from("ChatRoomMembers")
      .select("UserID")
      .eq("ChatRoomID", chatRoomId)
      .select();

    if (error) {
      throw error;
    }

    return data.map((item) => item.UserID);
  } catch (error) {
    console.error("Error fetching user IDs", error);
    return []; // エラーが発生した場合は空の配列を返す
  }
}
