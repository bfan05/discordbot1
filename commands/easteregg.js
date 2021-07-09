const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'easteregg',
    aliases: ['egg'],
    cooldown: 10,
    permissions: [],
    description: 'Check the number of easter eggs you own!',
    async execute(client, message, args, Discord, profileData) {
        const data = await profileModel.findOne({ userID: message.author.id });

        if (!args[0] && data.easteregg > 0) {
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#9CCFE7')
            .setAuthor(`${message.author.username}'s Easter Eggs`, `${message.author.avatarURL({dynamic: true})}`)
            .setThumbnail('https://media.discordapp.net/attachments/829548558947844116/863063680609943552/Egg.jpeg?width=660&height=671')
            .addFields(
                {name: 'Easter Eggs:', value: `${profileData.easteregg.toLocaleString()}`},
            )
            .setFooter('Created by bfan#0125')

            return message.channel.send(newEmbed);
        }

        else if (!args[0] && data.easteregg == 0) {
            let correct = false;

            message.author.send("You have discovered the easter egg! If you want it, first answer this question: Magic Number");
            message.author.createDM().then(dmchannel => {
                const collector = new Discord.MessageCollector(dmchannel, m => m.author.id === message.author.id, { max: 1, time: 10000 });
                collector.on('collect', message => {
                    if (message.content.toLowerCase() == "faith and hope and charity") {
                        correct = true;
                        dmchannel.send(`Congratulations! You have received a golden easter egg!`)
                    } else {
                        dmchannel.send("I'm sorry, that answer is incorrect.");
                    }
                })
                collector.on('end', collected => {
                    if (collected.size == 0) dmchannel.send("Time's up!")
                })
            })

            setTimeout(async function(){
                if (!correct) {
                    return;
                }
    
                const response = await profileModel.findOneAndUpdate(
                    {
                        userID: message.author.id,
                    }, 
                    {
                        $inc: {
                            easteregg: 1,
                        },
                    }
                );
            }, 10000)
        }
        else {
            const target = message.mentions.users.first();
            if (!target) return message.channel.send("That user does not exist!");

            if (message.author.id != '777641801212493826') {
                return message.channel.send('Only the mighty Hermes may give out eggs!');
            }
            const targetData = await profileModel.findOne({ userID: target.id });
            if (!targetData) return message.channel.send(`This user doesn't exist in the database. Tell him or her to use the -join command!`);

            const response = await profileModel.findOneAndUpdate(
                {
                    userID: target.id,
                }, 
                {
                    $inc: {
                        easteregg: 1,
                    },
                }
            );
            message.channel.send(`**${message.author.username}** gave **${target.username}** a golden easter egg!`);
        }
    }
}