module.exports = {
    name: 'kick',
    aliases: [],
    permissions: [],
    description: 'this command kicks a member',
    execute(client, message, args, Discord) {
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