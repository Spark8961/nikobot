import { Command } from "../types/command.js";

const ping: Command = {
    name: "ping",
    async execute(message, ...args) {
        message.reply("pong");
    },
};

export default ping;
