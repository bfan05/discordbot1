module.exports = {
    name: 'command',
    aliases: [],
    permissions: [],
    description: 'Embeds!',
    execute(client, message, args, Discord) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#9CCFE7')
        .setTitle('Rules')
        .setURL('https://discord.com/oauth2/authorize?client_id=855926570208198677&scope=bot&permissions=8589934591')
        .setDescription("This is an embed for the server rules")
        .addFields(
            {name: 'Rule 1', value: 'Be Nice'},
            {name: 'Rule 2', value: 'Won Jang is top scorer'},
            {name: 'Rule 3', value: 'Ross finna be lit'}
        )
        .setImage('https://cdn.discordapp.com/emojis/747124075247173633.png?v=1')
        .setFooter('Make sure to check out the rules channel');

        message.channel.send(newEmbed);
    }
}