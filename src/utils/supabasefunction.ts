import { supabase } from "./supabase";

//テスト用
export const fetchTest = async () => {
    const item = await supabase.from('test').select('*');
    return item.data;
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
    }else{
      return 'No User'

    }

  }
  