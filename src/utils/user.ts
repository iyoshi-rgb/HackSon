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
