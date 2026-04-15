import { BotClient } from "../types/botClient.js";
import { Event } from "../types/event.js";
import { logger } from "../utils/logger.js";

const event: Event<"messageCreate"> = {
    name: "messageCreate",
    once: false,
    execute: async (message) => {
        if (message.author.bot) return;

        const prefix = "!";
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.toLowerCase().slice(prefix.length).split(/\s+/);
        const commandName = args.shift();
        if (!commandName) return;

        const client = message.client as BotClient;
        const command = client.commands.get(commandName);
        if (!command) return;

        try {
            await command.execute(message, args);
        } catch (err) {
            logger.error({ err, command: command.name }, "Command failed");
        }
    },
};

export default event;
