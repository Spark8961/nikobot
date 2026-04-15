import { Event } from "../types/event.js";
// import db from "../db.js";

// TODO: Write Handler
const event: Event<"messageCreate"> = {
    name: "messageCreate",
    once: false,
    execute: async (message) => {
        if (message.author.bot) return;

        const prefix = "!";
        if (!message.content.startsWith(prefix)) return;

        if (message.content === "hi") message.reply("bye");
    },
};

export default event;
