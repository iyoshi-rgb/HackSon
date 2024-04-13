import { supabase } from "./supabase";

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
    console.log("success");
  }
}
