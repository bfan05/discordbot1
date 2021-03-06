const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'give',
    aliases: ['send'],
    permissions: [],
    description: 'Give a friend some TMA Cash!',
    async execute(client, message, args, Discord, profileData) {
        if (!args.length) return message.channel.send('You need to mention a member to give them TMA Cash!');
        const data = await profileModel.findOne({ userID: message.author.id });

        if (!args[1]) return message.channel.send('Please specify how much you want to give!');
        if (isNaN(args[1])) return message.channel.send("Please enter a real number!");
        if (args[1] > data.coins) return message.channel.send("You don't have enough, silly!")
        if (args[1] <= 0) return message.channel.send("You must give a positive amount, silly!");

        let amount = Math.floor(args[1]);
        if (amount > 1000) amount = 1000;
        const target = message.mentions.users.first();
        if (!target) return message.channel.send("That user does not exist!");

        if (target.id == message.author.id) {
            client.channels.cache.get('857330940631187526').send(`${target.username} sent **${amount.toLocaleString()}** themself.`);
            message.channel.send(`**${target.username}** gave **${amount.toLocaleString()}** TMA Cash to themself...`);
            return;
        }

        const targetData = await profileModel.findOne({ userID: target.id });
        if (!targetData) return message.channel.send(`This user doesn't exist in the database. Tell him or her to use the -join command!`);

        const response = await profileModel.findOneAndUpdate(
            {
                userID: target.id,
            }, 
            {
                $inc: {
                    coins: amount,
                    total: amount
                },
            }
        );
        const response2 = await profileModel.findOneAndUpdate(
            {
                userID: message.author.id,
            }, 
            {
                $inc: {
                    coins: -amount,
                },
            }
        );
        message.channel.send(`**${message.author.username}** sent **${amount.toLocaleString()}** TMA Cash to **${target.username}**!`);
        //client.channels.cache.get('857330940631187526').send(`**${message.author.username} (${message.author.id})** sent **${amount.toLocaleString()}** to **${target.username} (${target.id})**.`);
        client.channels.cache.get('857698338051588127').send(`**${message.author.username} (${message.author.id})** sent **${amount.toLocaleString()}** to **${target.username} (${target.id})**.`);
    }
}