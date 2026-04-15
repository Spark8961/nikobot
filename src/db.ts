import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl) {
    throw new Error("Missing DISCORD_TOKEN");
}

if (!supabaseKey) {
    throw new Error("Missing DISCORD_TOKEN");
}

const db = createClient(supabaseUrl, supabaseKey);
export default db;
