const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'adtake',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: 'Admins, take some TMC Cash from a member!',
    async execute(client, message, args, Discord, profileData) {
        if (!args.length) return message.channel.send('You need to mention a member to take TMC Cash from them!');

        const target = message.mentions.users.first();
        if (!target) return message.channel.send("That user does not exist!");

        if (!args[1]) return message.channel.send('Please specify how much you want to take!');
        if (isNaN(args[1])) return message.channel.send("Please enter a real number!");
        if (args[1] <= 0) return message.channel.send("You must take a positive amount, silly!");
        if (args[1] > target.coins) return message.channel.send("You can't take more than they have, silly!");

        let amount = Math.floor(args[1]);
        if (amount > 1000) amount = 1000;

        const targetData = await profileModel.findOne({ userID: target.id });
        if (!targetData) return message.channel.send(`This user doesn't exist in the database. Tell him or her to use the -join command!`);

        const response = await profileModel.findOneAndUpdate(
            {
                userID: target.id,
            }, 
            {
                $inc: {
                    coins: -amount,
                },
            }
        );
        const response2 = await profileModel.findOneAndUpdate(
            {
                userID: message.author.id,
            }, 
            {
                $inc: {
                    coins: amount,
                    total: amount,
                },
            }
        );
        message.channel.send(`**${message.author.username}** took **${amount.toLocaleString()}** TMC Cash from **${target.username}**. Boohoo!`);
        client.channels.cache.get('857330940631187526').send(`Admin **${message.author.username} (${message.author.id})** took **${amount.toLocaleString()}** from **${target.username} (${target.id})**.`);
    }
}