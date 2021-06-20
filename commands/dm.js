module.exports = {
    name: 'dm',
    description: 'this command dms a member',
    execute(message, args) {
        const member = message.mentions.users.first();
        const memberTarget = message.guild.members.cache.get(member.id);
        if (args[2]) {
            memberTarget.send(args[2]);
        } else {
            member.channel.send("please specify what you want to dm!");
        }
    }
}