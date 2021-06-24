module.exports = {
    name: 'balance',
    aliases: ['bal'],
    permissions: [],
    description: 'check your balance!',
    execute(client, message, args, Discord, profileData) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#9CCFE7')
        .setAuthor(`${message.author.username}'s TMC Cash`, `${message.author.avatarURL({dynamic: true})}`)
        .setThumbnail('https://media.discordapp.net/attachments/831654793754968074/857733544749826068/resized-image-Promo.jpeg')
        .addFields(
            {name: 'Wallet:', value: `${profileData.coins.toLocaleString()} 𝕋`},
            {name: 'Total (all time):', value: `${profileData.total.toLocaleString()} 𝕋`},
        )
        .setFooter('Created by bfan#0125')

        message.channel.send(newEmbed);
    }
}