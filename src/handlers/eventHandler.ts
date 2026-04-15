import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { BotClient } from "../types/botClient.js";
import { Event } from "../types/event.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const eventHandler = async (client: BotClient) => {
    const eventFiles = fs.readdirSync(path.join(__dirname, "../events")).filter((file) => file.endsWith(".js"));

    for (const file of eventFiles) {
        const eventUrl = pathToFileURL(path.join(__dirname, "../events", file)).href;
        const module = await import(eventUrl);
        const event = module.default as Event;
        console.log(event);

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
};

export default eventHandler;
