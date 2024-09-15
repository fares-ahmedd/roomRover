import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = process.env.SUPABASE_URL;

export const supabaseAnonKey = process.env.SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
