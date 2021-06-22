module.exports = {
    name: 'balance',
    description: 'check your balance!',
    execute(client, message, args, Discord, profileData) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#9CCFE7')
        .setAuthor(`**${message.author.username}**'s TMC Cash`)
        .addFields(
            {name: 'Wallet:', value: `${profileData.coins} 𝕋`},
            {name: 'Bank:', value: `${profileData.bank} 𝕋`},
        )
        .setImage('http://www.simpleimageresizer.com/_uploads/photos/fd03d8aa/tmc_1_20.gif')

        message.channel.send(newEmbed);
    }
}