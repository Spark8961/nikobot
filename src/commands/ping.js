export default {
    name: "ping",
    async execute(message, ...args) {
        message.reply("pong");
    },
};
