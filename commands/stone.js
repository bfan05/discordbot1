const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'stone',
    aliases: [],
    cooldown: 15,
    permissions: [],
    description: 'Answer the stone question or show your stone off!',
    async execute(client, message, args, Discord, profileData) {
        const data = await profileModel.findOne({ userID: message.author.id });

        if (!args[0] && data.stone > 0) {
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#9CCFE7')
            .setAuthor(`${message.author.username}'s Stone`, `${message.author.avatarURL({dynamic: true})}`)
            .setImage('https://cdn.discordapp.com/attachments/855927632419094582/866512568604688424/stone.gif')
            .addFields(
                {name: `${message.author.username} has a rare stone! Great job.`, value: `\u200B`},
            )
            .setFooter('Created by bfan#0125')

            return message.channel.send(newEmbed);
        }

        else if (!args[0] && data.stone == 0 && data.cloak > 0) {
            let correct = false;

            message.author.createDM().then(dmchannel => {
                const newEmbed = new Discord.MessageEmbed()
                .setColor('#9CCFE7')
                .setAuthor(`Stone`, `${message.author.avatarURL({dynamic: true})}`)
                .setImage('https://cdn.discordapp.com/attachments/855927632419094582/866512568604688424/stone.gif')
                .addFields(
                    {name: `So I see you want a stone...`, value: `***Classified with more than one X, these animals were discovered in Harrys later years at Hogwarts. They're not supposed to bring good fortune. What are these creatures and how do you see them?***`},
                )
                .setFooter('Created by bfan#0125')
                dmchannel.send(newEmbed);
            })
            message.author.createDM().then(dmchannel => {
                const collector = new Discord.MessageCollector(dmchannel, m => m.author.id === message.author.id, { max: 1, time: 15000 });
                collector.on('collect', message => {
                    if (message.content.toLowerCase() == "thestrals. you must have witnessed a death") {
                        correct = true;
                        dmchannel.send(`Congratulations! You are another step closer to mastering Death. You have the Cloak of Invisibility. Type -stone for the next item`)
                    } else {
                        dmchannel.send("Imagine being so dumb you can't answer this question correctly... Incorrect!");
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
                            stone: 1,
                        },
                    }
                );
            }, 15000)
        }
        else if (!args[0] && data.stone == 0 && data.cloak == 0) {
            message.author.send("You cannot get a stone before getting the cloak! Come back when you are ready, fool!");
        }
        else {
            const target = message.mentions.users.first();
            if (!target) return message.channel.send("That user does not exist!");

            if (message.author.id != '777641801212493826') {
                return message.channel.send('Only the mighty Hermes may give out a stone!');
            }
            const targetData = await profileModel.findOne({ userID: target.id });
            if (!targetData) return message.channel.send(`This user doesn't exist in the database. Tell him or her to use the -join command!`);

            const response = await profileModel.findOneAndUpdate(
                {
                    userID: target.id,
                }, 
                {
                    $inc: {
                        stone: 1,
                    },
                }
            );
            message.channel.send(`**${message.author.username}** gave **${target.username}** a new mysterious stone!`);
        }
    }
}