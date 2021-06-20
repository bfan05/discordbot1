module.exports = {
    name: 'dm',
    description: 'this command dms a member',
    execute(message, args) {
        const member = message.mentions.users.first();
        const memberTarget = message.guild.members.cache.get(member.id);
        if (!member) message.channel.send("i could not find that member!");
        if (args[1]) {
            let msg = args[1];
            let i = 1;
            while (args[i + 1]) {
                msg += " " + args[i + 1];
                ++i;
            }
            memberTarget.send(msg);
        } else {
            message.channel.send("please specify what you want to dm!");
        }
    }
}