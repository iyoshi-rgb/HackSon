import { supabase } from "./supabase";

//テスト用
export const fetchTest = async () => {
    const item = await supabase.from('test').select('*');
    return item.data;
}