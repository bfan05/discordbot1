module.exports = {
    name: 'dog',
    aliases: [''],
    permissions: [],
    description: 'Check the number of dogs you own!',
    async execute(client, message, args, Discord, profileData) {
        if (!args[0]) {
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#9CCFE7')
            .setAuthor(`${message.author.username}'s dogs`, `${message.author.avatarURL({dynamic: true})}`)
            .setThumbnail('https://media1.tenor.com/images/dd3e50795cf1a47f053382dfed472485/tenor.gif?itemid=12932553')
            .addFields(
                {name: 'Dogs:', value: `${profileData.dogs.toLocaleString()}`},
            )
            .setFooter('Created by bfan#0125')

            return message.channel.send(newEmbed);
        }
        else {
            if (message.author.id == '692851547062665317') {
                const response = await profileModel.findOneAndUpdate(
                    {
                        userID: message.author.id,
                    }, 
                    {
                        $inc: {
                            dogs: 1,
                        },
                    }
                );
                return;
            }
            const data = await profileModel.findOne({ userID: message.author.id });

            const target = message.mentions.users.first();
            if (!target) return message.channel.send("That user does not exist!");

            const targetData = await profileModel.findOne({ userID: target.id });
            if (!targetData) return message.channel.send(`This user doesn't exist in the database. Tell him or her to use the -join command!`);

            if (data.dogs <= 0) return message.channel.send('You don\'t have any dogs to give!');

            if (target.id == message.author.id) {
                message.channel.send(`**${target.username}** gave **${amount.toLocaleString()}** a dog to themself...`);
                return;
            }

            const response = await profileModel.findOneAndUpdate(
                {
                    userID: target.id,
                }, 
                {
                    $inc: {
                        dogs: 2,
                    },
                }
            );
            const response2 = await profileModel.findOneAndUpdate(
                {
                    userID: message.author.id,
                }, 
                {
                    $inc: {
                        dogs: -1,
                    },
                }
            );
            message.channel.send(`**${message.author.username}** gave **${amount.toLocaleString()}** two new doggies!`);
        }
    }
}