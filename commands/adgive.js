const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'adgive',
    aliases: [],
    permissions: ["BAN_MEMBERS"],
    description: 'Admins, give a member some TMA Cash!',
    async execute(client, message, args, Discord, profileData) {
        if (!args.length) return message.channel.send('You need to mention a member to give them TMA Cash!');

        if (!args[1]) return message.channel.send('Please specify how much you want to give!');
        if (isNaN(args[1])) return message.channel.send("Please enter a real number!");
        if (args[1] <= 0) return message.channel.send("You must give a positive amount, silly!");

        let amount = Math.floor(args[1]);
        if (amount > 1000) amount = 1000;
        const target = message.mentions.users.first();
        if (!target) return message.channel.send("That user does not exist!");

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
        message.channel.send(`**${target.username}** gained **${amount.toLocaleString()}** TMA Cash!`);
        //client.channels.cache.get('857330940631187526').send(`**${message.author.username} (${message.author.id})** adgave **${amount.toLocaleString()}** to **${target.username} (${target.id})**.`);
        client.channels.cache.get('857698338051588127').send(`**${message.author.username} (${message.author.id})** adgave **${amount.toLocaleString()}** to **${target.username} (${target.id})**.`);
    }
}