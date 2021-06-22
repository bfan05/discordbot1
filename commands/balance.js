module.exports = {
    name: 'balance',
    description: 'check your balance!',
    execute(client, message, args, Discord, profileData) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#9CCFE7')
        .setTitle(`**${message.author.username}**'s TMC Cash`)
        .setThumbnail(message.author.displayAvatarURL)
        .addFields(
            {name: 'Wallet:', value: `${profileData.coins} 𝕋`},
            {name: 'Bank:', value: `${profileData.bank} 𝕋`},
        )
        .setImage('http://www.simpleimageresizer.com/_uploads/photos/fd03d8aa/tmc_25.gif')

        message.channel.send(newEmbed);
    }
}