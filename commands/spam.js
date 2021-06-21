module.exports = {
    name: 'spam',
    description: 'the bot spams',
    async execute(message, args, Discord) {
        if (!args[0]) return message.reply("please specify the amount of messages you want to clear!");
        if (isNaN(args[0])) return message.reply("please enter a real number!");
        if (args[0] > 100) return message.reply("you cannot spam more than 100 messages!");
        if (args[0] < 1) return message.reply("you must spam at least one message!");
        if (args[1]) {
            let msg = args[1];
            let i = 1;
            while (args[i + 1]) {
                msg += " " + args[i + 1];
                ++i;
            }
            for (let j = 0; j < args[0]; ++j) message.channel.send(msg);
        } else {
            return message.channel.send("please specify what you want to spam!");
        }
        message.channel.send('spam complete!');
    }
}