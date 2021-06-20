module.exports = {
    name: 'spam',
    description: 'the bot spams',
    async execute(message, args, Discord) {
        if (!args[0]) return message.reply("please specify the amount of messages you want to clear!");
        if (isNaN(args[0])) return message.reply("please enter a real number!");
        if (args[0] > 100) return message.reply("you cannot spam more than 100 messages!");
        if (args[0] < 1) return message.reply("you must spam at least one message!");
        for (let i = 0; i < args[0]; ++i) message.channel.send("spam");
        message.channel.send('<:spam:829844866946957343>');
    }
}