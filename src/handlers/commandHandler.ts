import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Collection } from "discord.js";
import { BotClient } from "../types/botClient.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// TODO: Test Working
const loadCommands = async (client: BotClient) => {
    client.commands = new Collection();
    const commandFiles = fs.readdirSync(path.join(__dirname, "../commands")).filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
        const command = await import(path.join(__dirname, "../commands", file));
        client.commands.set(command.name, command);
    }
};

export default loadCommands;
