import { supabase } from "./supabase";

interface ProfileProps {
  userId: string;
  userName?: string;
  bio?: string;
  userImage?: string;
  favoriteSpot?: string;
  location?: string;
} // プロ

// フィールを作成する
export const makeProfile = async (
  userId: string,
  userName?: string,
  bio?: string,
  userImage?: string,
  favoriteSpot?: string,
  location?: string
) => {
  const { data, error } = await supabase.from("Profile").insert([
    {
      UserId: userId,
      UserName: userName,
      Bio: bio,
      UserImage: userImage,
      FavoriteSpot: favoriteSpot,
      Location: location,
    },
  ]);

  // エラーチェック
  if (error) {
    console.error("Error inserting data", error);
    return null;
  }

  return data;
};
// プロフィールを更新する
export const updateProfile = async (userId: string, updatedProfile: ProfileProps) => {
  const { data, error } = await supabase
    .from("Profile")
    .update({
      UserName: updatedProfile.userName,
      Bio: updatedProfile.bio,
      UserImage: updatedProfile.userImage,
      FavoriteSpot: updatedProfile.favoriteSpot,
      Location: updatedProfile.location,
    })
    .eq("UserId", userId);

  if (error) {
    console.error("Error updating profile", error);
    return null;
  }

  return data;
};

export async function getProfile(userId: string) {
  // userIdをパラメータとして受け取り、それを使ってプロフィール情報を取得
  const { data: profile, error } = await supabase.from("Profile").select("*").eq("UserId", userId).single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
  return profile;
}

// export const getProfile = async (userId: string) => {
//   const { data, error } = await supabase.from("Profile").select("*").eq("UserId", userId);
//   if (error) {
//     console.error("Error fetching profile", error);
//     return null;
//   }
//   return data;
// };

export const UserUpdate = async (location : any,id : any) => {
  const { data, error } = await supabase
  .from('Profile')
  .update({ Location: location })
  .eq('UserId', id)
  .select()

}