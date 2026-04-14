import { createClient } from "@supabase/supabase-js";

export default db = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
