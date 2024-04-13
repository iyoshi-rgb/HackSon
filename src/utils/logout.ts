import { supabase } from "./supabase";

export const Logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return error
    } else {
      return ;
    }
}