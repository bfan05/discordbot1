module.exports = {
    name: 'mute',
    description: 'mutes a member',
    execute(message, args) {
        const target = message.mentions.users.first();
        if (target) {
            let mainRole = message.guild.roles.cache.find(role => role.name === 'Member');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'muted');

            let memberTarget = message.guild.members.cache.get(target.id);
            
            memberTarget.roles.add(muteRole);
            memberTarget.roles.remove(mainRole);
            message.channel.send(`<@${memberTarget.user.id}> has been muted`);
        } else {
            message.channel.send("could not find that member!");
        }
    }
}