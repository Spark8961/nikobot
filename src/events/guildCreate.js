import db from "../db.js";

export default {
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
