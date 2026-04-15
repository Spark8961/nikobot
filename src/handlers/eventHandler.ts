import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { BotClient } from "../types/botClient.js";
import { Event } from "../types/event.js";
import { logger } from "../utils/logger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const eventHandler = async (client: BotClient) => {
    const eventFiles = fs.readdirSync(path.join(__dirname, "../events")).filter((file) => file.endsWith(".js"));

    logger.info("Loading Events ...");
    for (const file of eventFiles) {
        const eventUrl = pathToFileURL(path.join(__dirname, "../events", file)).href;
        let event;
        try {
            const eventModule = await import(eventUrl);
            event = eventModule.default;
            logger.debug({ file, event: event.name }, "Loaded Event");
        } catch (error) {
            logger.error({ error });
            return;
        }

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }

    logger.info("All Events Loaded");
};

export default eventHandler;
