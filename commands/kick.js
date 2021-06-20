module.exports = {
    name: 'kick',
    description: 'this command kicks a member',
    execute(message, args) {
        const member = message.mentions.users.first();
        if (member) {
            const memberTarget = message.guild.members.cache.get(member.id);
            memberTarget.kick();
            message.channel.send("user has been kicked!")
        } else {
            message.channel.send("you could not kick that member!");
        }
    }
}