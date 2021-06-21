module.exports = {
    name: 'dm',
    description: 'this command dms a member',
    execute(message, args) {
        const member = message.mentions.users.first();
        const memberTarget = message.guild.members.cache.get(member.id);
        if (!member) message.channel.send("i could not find that member!");
        if (!args[1]) return message.reply("please specify the amount of messages you want to clear!");
        if (isNaN(args[1])) return message.reply("please enter a real number!");
        if (args[1] > 100) return message.reply("you cannot dm more than 100 messages!");
        if (args[1] < 1) return message.reply("you must dm at least one message!");
        if (args[2]) {
            let msg = args[2];
            let i = 2;
            while (args[i + 1]) {
                msg += " " + args[i + 1];
                ++i;
            }
            for (let j = 0; j < args[1]; ++j) memberTarget.send(msg);
            message.channel.send('dm complete!');
        } else {
            return message.channel.send("please specify what you want to dm!");
        }
    }
}