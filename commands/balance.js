module.exports = {
    name: 'balance',
    description: 'check your balance!',
    execute(client, message, args, Discord, profileData) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#9CCFE7')
        .setTitle(`**${message.author.username}**'s TMC Cash`)
        .addFields(
            {name: 'Wallet', value: `𝕋${profileData.coins}`},
            {name: 'Bank', value: `𝕋${profileData.bank}`},
        )

        message.channel.send(newEmbed);
    }
}