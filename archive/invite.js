module.exports = {
    name: 'invite',
    aliases: [],
    permissions: [],
    description: 'Sends invite link.',
    execute(client, message, args, Discord) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#9CCFE7')
        .setTitle('FirstBot Invite Link')
        .setURL('https://discord.com/oauth2/authorize?client_id=855926570208198677&scope=bot&permissions=8589934591')
        .setDescription("Invite FirstBot to your server!")
        .addFields(
            {name: 'Invite Link', value: 'https://discord.com/oauth2/authorize?client_id=855926570208198677&scope=bot&permissions=8589934591'}
        )
        .setImage('https://cdn.discordapp.com/emojis/747124075247173633.png?v=1')
        .setFooter('Make sure to check out the rules channel');

        message.channel.send(newEmbed);
    }
}