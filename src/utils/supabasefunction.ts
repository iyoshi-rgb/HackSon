import { supabase } from "./supabase";

export const fetchTest = async () => {
    const item = await supabase.from('test').select('*');
    return item.data;
}