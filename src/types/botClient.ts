import { Client, Collection } from "discord.js";
import { Command } from "./command.js";

export class BotClient extends Client {
    commands = new Collection<string, Command>();
}
