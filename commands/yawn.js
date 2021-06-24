module.exports = {
    name: 'yawn',
    aliases: [],
    permissions: [],
    description: 'Are you tired?',
    async execute(client, message, args, Discord) {
        if (!args[0]) return message.reply("Please specify the number of yawns!");
        if (isNaN(args[0])) return message.reply("Please enter a real number!");
        if (args[0] > 100) return message.reply("You cannot yawn more than 100 times!");
        if (args[0] < 1) return message.reply("You must yawn at least once!");

        let numYawns = Math.floor(args[0]);

        for (let i = 0; i < numYawns; ++i) {
            message.channel.send(`<:zzmilkyawn:857418851757850685>`);
        }
    }
}