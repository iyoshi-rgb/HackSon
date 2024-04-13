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
