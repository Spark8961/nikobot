import "dotenv/config";

import { GatewayIntentBits } from "discord.js";
import eventHandler from "./handlers/eventHandler.js";
import { BotClient } from "./types/botClient.js";
import loadCommands from "./handlers/commandHandler.js";

const client = new BotClient({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

await eventHandler(client);
await loadCommands(client);

const token = process.env.DISCORD_TOKEN;

if (!token) {
    throw new Error("Missing Discord Token.");
}
//TODO: Ad DB connection check before bot starts.
client.login(token);
