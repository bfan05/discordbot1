/*const ms = require('ms');
module.exports = {
    name: 'mute',
    description: 'mutes a member',
    execute(message, args) {
        const target = message.mentions.users.first();
        if (target) {
            let mainRole = message.guild.roles.cache.find(role => role.name === 'Member');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'muted');

            let memberTarget = message.guild.members.cache.get(target.id);

            if (!args[1]) {
                memberTarget.roles.add(muteRole);
                memberTarget.roles.remove(mainRole);
                message.channel.send(`<@${memberTarget.user.id}> has been muted`);
                return;
            }

            memberTarget.roles.add(muteRole);
            memberTarget.roles.remove(mainRole);
            message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`);

            setTimeout(function () {
                memberTarget.roles.remove(muteRole);
                memberTarget.roles.add(mainRole);
            }, ms(args[1]));
        } else {
            message.channel.send("could not find that member!");
        }
    }
}*/

module.exports = {
    name: 'unmute',
    description: 'unmutes a member',
    execute(client, message, args, Discord) {
        const target = message.mentions.users.first();
        if (target) {
            let mainRole = message.guild.roles.cache.find(role => role.name === 'Member');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'muted');

            let memberTarget = message.guild.members.cache.get(target.id);
            
            memberTarget.roles.remove(mainRole);
            memberTarget.roles.add(muteRole);
            message.channel.send(`<@${memberTarget.user.id}> has been muted`);
        } else {
            message.channel.send("could not find that member!");
        }
    }
}