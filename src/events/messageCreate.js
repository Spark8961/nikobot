// import db from "../db.js";

export default {
    name: "messageCreate",
    once: false,
    execute: async (message) => {
        if (message.content === "hi") message.reply("bye");
    },
};
