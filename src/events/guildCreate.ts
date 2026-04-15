import { Event } from "../types/event.js";
import db from "../db.js";

const event: Event<"guildCreate"> = {
    name: "guildCreate",
    once: false,
    execute: async (guild) => {
        const { error } = await db.from("guilds").insert({
            guild_id: guild.id,
        });

        if (error) {
            console.error("Error inserting guild into database:", error);
        }
    },
};

export default event;
