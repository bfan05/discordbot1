const profileModel = require('../models/profileSchema');

function randomNumber(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

module.exports = {
    name: 'coinflip',
    aliases: ['cf'],
    permissions: [],
    description: 'flips a coin',
    async execute(client, message, args, Discord) {
        const data = await profileModel.findOne({ userID: message.author.id });

        if (!args[0]) return message.channel.send('Please specify how much you want to gamble!');
        if (isNaN(args[0])) return message.reply("Please enter a real number!");
        if (args[0] > data.coins) return message.reply("You don't have enough TMC Cash, silly!");
        if (args[0] < 0) return message.reply("You must gamble a positive amount, silly!");

        if (!args[1] || (args[1] != 'heads' && args[1] != 'tails')) return message.reply('You must choose heads or tails!');

        let flip = randomNumber(1, 100);
        if (flip == 1) {
            message.channel.send(`${message.author.username} bet ${args[0]}... 🪙 **|** the coin lands on its **side**! You won ${args[0]} TMC Cash!`);
        }
        else if(flip % 2 == 0) {
            if (args[1] == 'heads') {
                message.channel.send(`${message.author.username} bet ${args[0]}... 🪙 **|** the coin lands on **heads**! You won ${2 * args[0]} TMC Cash!`);
            }
            else {
                message.channel.send(`${message.author.username} bet ${args[0]}... 🪙 **|** the coin lands on **heads! You lost it all...`);
            }
        }
        else {
            if (args[1] == 'tails') {
                message.channel.send(`${message.author.username} bet ${args[0]}... 🪙 **|** the coin lands on **tails**! You won ${2 * args[0]} TMC Cash!`);
            }
            else {
                message.channel.send(`${message.author.username} bet ${args[0]}... 🪙 **|** the coin lands on **tails! You lost it all...`);
            }
        }
    }
}