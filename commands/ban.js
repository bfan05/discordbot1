module.exports = {
    name: 'ban',
    description: 'this command bans a member',
    execute(message, args) {
        const member = message.mentions.users.first();
        if (member) {
            const memberTarget = message.guild.members.cache.get(member.id);
            memberTarget.ban();
            message.channel.send("user has been banned!")
        } else {
            message.channel.send("you could not ban that member!");
        }
    }
}