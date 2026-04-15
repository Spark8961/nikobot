import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { Collection } from "discord.js";
import { BotClient } from "../types/botClient.js";
import { logger } from "../utils/logger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const loadCommands = async (client: BotClient) => {
    client.commands = new Collection();

    const commandFiles = fs.readdirSync(path.join(__dirname, "../commands")).filter((file) => file.endsWith(".js"));

    logger.info("Loading Commands...");
    for (const file of commandFiles) {
        const commandUrl = pathToFileURL(path.join(__dirname, "../commands", file)).href;
        let command;

        try {
            const commandModule = await import(commandUrl);
            command = commandModule.default;
        } catch (error) {
            logger.error({ error });
        }

        client.commands.set(command.name, command);
        logger.debug({ file, command: command.name }, "Loaded Command");
    }
    logger.info("Commands Loaded.");
};

export default loadCommands;
