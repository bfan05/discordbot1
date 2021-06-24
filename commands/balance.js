module.exports = {
    name: 'balance',
    aliases: ['bal'],
    permissions: [],
    description: 'check your balance!',
    execute(client, message, args, Discord, profileData) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#9CCFE7')
        .setAuthor(`${message.author.username}'s TMC Cash`, `${message.author.avatarURL({dynamic: true})}`)
        .setThumbnail('https://cdn.discordapp.com/emojis/857732279367761940.png?v=1')
        .addFields(
            {name: 'Wallet:', value: `${profileData.coins.toLocaleString()} 𝕋`},
            {name: 'Total (all time):', value: `${profileData.total.toLocaleString()} 𝕋`},
        )
        .setFooter('Created by bfan#0125')

        message.channel.send(newEmbed);
    }
}