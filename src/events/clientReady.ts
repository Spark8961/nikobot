import { Event } from "../types/event.js";
import db from "../db.js";

const event: Event<"clientReady"> = {
    name: "clientReady",
    once: true,
    execute: async (client) => {
        const rows = [];
        for (const guild of client.guilds.cache.values()) {
            rows.push({
                guild_id: guild.id,
            });
        }
        const { error } = await db.from("guilds").upsert(rows, { onConflict: "guild_id", ignoreDuplicates: true });
        if (error) console.log("There was an error updating servers.");
        console.log(`Logged in as ${client.user.tag}`);
    },
};

export default event;
