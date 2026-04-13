import { Client, GatewayIntentBits } from "discord.js";
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const db = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

client.once("clientReady", () => {
    for (const guild of client.guilds.cache.values()) {
        db.from("guilds").upsert({
            guild_id: guild.id,
        });
    }
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("guildCreate", async (guild) => {
    const { data, error } = await db.from("guilds").insert({
        guild_id: guild.id,
    });

    if (error) {
        console.error("Error inserting guild into database:", error);
    }
});

client.on("guildDelete", async (guild) => {
    const { data, error } = await db.from("guilds").delete().eq("guild_id", guild.id);

    if (error) {
        console.error("Error deleting guild from database:", error);
    }
});

client.login(process.env.DISCORD_TOKEN);
