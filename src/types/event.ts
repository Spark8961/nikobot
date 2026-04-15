import { ClientEvents } from "discord.js";
import { BotClient } from "./botClient.js";

export interface Event<K extends keyof ClientEvents = keyof ClientEvents> {
    name: K;
    once?: boolean;
    execute: (...args: ClientEvents[K]) => Promise<void>;
}
