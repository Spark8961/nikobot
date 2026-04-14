import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async (client) => {
    const eventFiles = fs.readdirSync(path.join(__dirname, "../events")).filter((file) => file.endsWith(".js"));

    for (const file of eventFiles) {
        const event = await import(path.join(__dirname, "../events", file));
        if (event.once) {
            client.once(event.default.name, (...args) => event.default.execute(...args));
        } else {
            client.on(event.default.name, (...args) => event.default.execute(...args));
        }
    }
};
