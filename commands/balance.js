module.exports = {
    name: 'balance',
    description: 'check your balance!',
    execute(client, message, args, Discord, profileData) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#9CCFE7')
        .setTitle(`**${message.author.username}**'s TMC Cash`)
        .setThumbnail(message.author.dispalyAvatarURL)
        .addFields(
            {name: 'Wallet:', value: `${profileData.coins} 𝕋`},
            {name: 'Bank:', value: `${profileData.bank} 𝕋`},
        )
        .setImage('https://media.discordapp.net/attachments/831654793754968074/849919810611314748/eed9f8da-327e-4646-b24b-e916c6cca394.gif')

        message.channel.send(newEmbed);
    }
}