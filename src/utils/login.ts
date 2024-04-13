import { supabase } from "./supabase";
import { createChatRoom } from "./makeroom";

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
  //   const userID = "1";
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


export async function handleSocialLogin(provider: any) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
  
    if (error) {
      console.log(error);
      return;
    }else{
        console.log(data)
    }
  }

  export async function getUser() {
    const { data: { user } } = await supabase.auth.getUser()
    
    if(user){
      return user.id
    }
  }