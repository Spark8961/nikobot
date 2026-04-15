import { Event } from "../types/event.js";
import db from "../db.js";

const event: Event<"guildDelete"> = {
    name: "guildDelete",
    once: false,
    execute: async (guild) => {
        const { error } = await db.from("guilds").delete().eq("guild_id", guild.id);

        if (error) {
            console.error("Error deleting guild from database:", error);
        }
    },
};

export default event;
