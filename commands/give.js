const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'give',
    aliases: [],
    permissions: [],
    description: 'Give a friend some TMC Cash!',
    async execute(client, message, args, Discord, profileData) {
        if (!args.length) return message.channel.send('You need to mention a member to give them TMC Cash!');
        const data = await profileModel.findOne({ userID: message.author.id });

        if (!args[1]) return message.channel.send('Please specify how much you want to give!');
        if (isNaN(args[1])) return message.channel.send("Please enter a real number!");
        if (args[1] > data.coins) return message.channel.send("You don't have enough, silly!")
        if (args[1] <= 0) return message.channel.send("You must give a positive amount, silly!");

        const amount = Math.floor(args[1]);
        const target = message.mentions.users.first();
        if (!target) return message.channel.send("That user does not exist!");

        if (target.id == message.author.id) return message.channel.send(`${target.username} gave **${amount}** TMC Cash to themself...`);

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
        message.channel.send(`**${message.author.username}** sent **${amount}** TMC Cash to **${target.username}**!`);
    }
}