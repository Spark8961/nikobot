import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl) {
    throw new Error("Missing Supabase URL");
}

if (!supabaseKey) {
    throw new Error("Missing Supabase Token");
}

const db = createClient(supabaseUrl, supabaseKey);
export default db;
