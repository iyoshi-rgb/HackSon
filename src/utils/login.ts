import { supabase } from "./supabase";

import { createChatRoom } from "./makeroom";

export async function CreateChatRoomFunc(
  userID: string,
  title: string,
  about: string,
  location: string
) {
  const createRoomData = await createChatRoom(userID, title, about, location);
  console.log("Created Room:", createRoomData);
}

export async function handleSocialLogin(provider: any) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.log(error);
    return;
  } else {
    console.log(data);
  }
}

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return user.id;
  } else {
    return "No User";
  }
}

export async function getProfile(userId: string) {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("userId", userId)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
  return profile;
}
