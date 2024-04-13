import { supabase } from "./supabase";

export const getPostMessages = async ({ user_id }: any) => {
  const { data, error } = await supabase
    .from("Messages")
    .select("*")
    .eq("receiver_id", user_id);
  if (data) {
    return data;
  } else {
    return;
  }
};

export const getSendMessages = async ({ user_id }: any) => {
  const { data, error } = await supabase
    .from("Messages")
    .select("*")
    .eq("sender_id", user_id);
  if (data) {
    return data;
  } else {
    return;
  }
};

export const postMessage = async ({ receiver_id, sender_id, content }: any) => {
  const { data, error } = await supabase.from("Messages").insert([
    {
      sender_id: sender_id,
      receiver_id: receiver_id,
      content: content,
    },
  ]);
};
