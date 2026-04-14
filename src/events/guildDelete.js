import db from "../db.js";

export default {
    name: "guilDelete",
    once: false,
    execute: async (guild) => {
        const { error } = await db.from("guilds").delete().eq("guild_id", guild.id);

        if (error) {
            console.error("Error deleting guild from database:", error);
        }
    },
};
