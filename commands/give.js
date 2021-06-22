const profileModel = require("../models/profileSchema");

/*module.exports = {
    name: 'give',
    aliases: [],
    permissions: [],
    description: 'Give a player some TMC Cash!',
    async execute(message, args, client, Discord, profileData) {
        if (!args.length) return message.channel.send("You need to mention a player to give them TMC Cash!");

        if (!args[1]) return message.channel.send('Please specify how much you want to give!');
        if (isNaN(args[1])) return message.reply("Please enter a real number!");
        if (args[1] <= 0) return message.reply("You must give a positive amount, silly!");

        const amount = Math.floor(args[1]);
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
                    coins: amount
                },
            }
        );
        message.channel.send(`**${target.username}** gained ${amount} TMC Cash!`);
    },
};*/

module.exports = {
    name: 'give',
    aliases: [],
    permissions: [],
    description: 'flips a coin',
    async execute(client, message, args, Discord, profileData) {
        const data = await profileModel.findOne({ userID: message.author.id });

        if (!args[0]) return message.channel.send('Please specify how much you want to gamble!');
        if (isNaN(args[0])) return message.reply("Please enter a real number!");
        if (args[0] > data.coins) return message.reply("You don't have enough TMC Cash, silly!");
        if (args[0] <= 0) return message.reply("You must gamble a positive amount, silly!");

        if (!args[1] || (args[1] != 'heads' && args[1] != 'h'
        && args[1] != 'tails' && args[1] != 't')) return message.reply('You must choose heads or tails!');
        let update = 0;
        let totalUpdate = 0;
        let bet = Math.floor(args[0]);

        let flip = randomNumber(1, 101);
        if (flip == 1) {
            message.channel.send(`${message.author.username} bet **${bet}**... 🪙 **|** the coin lands on its **side**! You won **${bet}** TMC Cash!`);
        }
        else if(flip % 2 == 0) {
            if (args[1] == 'heads' || args[1] == 'h') {
                update = bet;
                message.channel.send(`${message.author.username} bet **${bet}** and chose heads... 🪙 **|** the coin lands on **heads**! You won **${2 * bet}** TMC Cash!`);
            }
            else {
                update = -bet;
                message.channel.send(`${message.author.username} bet **${bet}** and chose heads... 🪙 **|** the coin lands on **heads**! You lost it all...`);
            }
        }
        else {
            if (args[1] == 'tails' || args[1] == 't') {
                update = bet;
                message.channel.send(`${message.author.username} bet **${bet}** and chose tails... 🪙 **|** the coin lands on **tails**! You won **${2 * bet}** TMC Cash!`);
            }
            else {
                update = -bet;
                message.channel.send(`${message.author.username} bet **${bet}** and chose tails... 🪙 **|** the coin lands on **tails**! You lost it all...`);
            }
        }
        if (update > 0) totalUpdate = update;
        const response = await profileModel.findOneAndUpdate(
            {
                userID: message.author.id,
            }, 
            {
                $inc: {
                    coins: update,
                    total: totalUpdate,
                },
            }
        );
    }
}