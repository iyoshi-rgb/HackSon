import { supabase } from "./supabase";


export const insertProfile = async ( UserId : any,UserName :any) => {
    try {
        const { data: profile, error: selectError } = await supabase
            .from('Profile')
            .select("*")
            .eq('UserId', UserId)
            .single();

        if (!profile) {
            const { data: insertedData, error: insertError } = await supabase
                .from('Profile')
                .insert({ UserId : UserId , UserName: UserName});

            if (insertError) {
                return insertError;
            }
            return insertedData;
        } else {
            return profile;
        }
    } catch (error) {
        return error;
    }
}

export const fetchLocation = async (id : string | undefined) => {
const { data: Profile, error } = await supabase
  .from('Profile')
  .select("Location").eq('UserId' , id)
  
if(Profile){
    return Profile
}else{
    return 
}
}