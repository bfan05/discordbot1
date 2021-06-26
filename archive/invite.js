module.exports = {
    name: 'invite',
    aliases: [],
    permissions: [],
    description: 'Sends invite link.',
    execute(client, message, args, Discord) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#9CCFE7')
        .setTitle('FirstBot Invite Link')
        .setDescription("Invite FirstBot to your server!")
        .addFields(
            {name: 'Invite Link', value: 'link revoked'}
        )
        .setImage('https://cdn.discordapp.com/emojis/747124075247173633.png?v=1')
        .setFooter('Make sure to check out the rules channel');

        message.channel.send(newEmbed);
    }
}