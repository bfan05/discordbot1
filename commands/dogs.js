module.exports = {
    name: 'dogs',
    aliases: [''],
    permissions: [],
    description: 'Check the number of dogs you own!',
    execute(client, message, args, Discord, profileData) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#9CCFE7')
        .setAuthor(`${message.author.username}'s Dogs`, `${message.author.avatarURL({dynamic: true})}`)
        .setThumbnail('https://media.tenor.com/images/2b7e998f3e644539a136e1dec617d69c/tenor.gif')
        .addFields(
            {name: 'Dogs:', value: `${profileData.dogs.toLocaleString()}`},
        )
        .setFooter('Created by bfan#0125')

        message.channel.send(newEmbed);
    }
}