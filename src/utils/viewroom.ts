import { supabase } from "./supabase";

export const getChatRoomIds = async (userID: string) => {
  console.log("userID", userID);
  const { data, error } = await supabase
    .from("ChatRoomMembers")
    .select("ChatRoomID")
    .eq("UserID", userID)
    .select();

  if (error) {
    console.error("Error fetching ChatRoomID", error);
    return null;
  }
  return data;
};

export const getMyChatRooms = async (userID: string) => {
  const { data, error } = await supabase
    .from("ChatRooms")
    .select("*")
    .eq("UserID", userID);

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
    .eq("Location", location);

  if (error) {
    console.error("Error fetching chat rooms by location", error);
    return null;
  }

  return data;
};
