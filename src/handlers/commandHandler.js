import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Collection } from "discord.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default loadCommands = async (client) => {
    client.commands = new Collection();
    const commandFiles = fs.readdirSync(path.join(__dirname, "../commands")).filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
        const command = await import(path.join(__dirname, "../commands", file));
        client.commands.set(command.name, command);
    }
};
