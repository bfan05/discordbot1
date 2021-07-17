const profileModel = require('../models/profileSchema');

function randomNumber(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

module.exports = {
    name: 'coinflip',
    aliases: ['cf'],
    cooldown: 10,
    permissions: [],
    description: 'Flip a coin to win some cash!',
    async execute(client, message, args, Discord, profileData) {
        const data = await profileModel.findOne({ userID: message.author.id });

        if (!args[0]) return message.channel.send('Please specify how much you want to gamble!');
        if (isNaN(args[0]) && args[0] != 'all') return message.channel.send("Please enter a real number!");
        if (args[0] > data.coins) return message.channel.send("You don't have enough TMC Cash, silly!");
        if (args[0] <= 0) return message.channel.send("You must gamble a positive amount, silly!");

        if (!args[1] || (args[1] != 'heads' && args[1] != 'h'
        && args[1] != 'tails' && args[1] != 't')) return message.reply('You must choose heads or tails!');
        let update = 0;
        let totalUpdate = 0;
        let bet = 0;
        if (args[0] == 'all') bet = Math.min(data.coins, 100);
        else bet = Math.floor(args[0]);
        if (bet > 100) bet = 100;

        let flip = randomNumber(1, 25);
        if (flip == 25) {
            if (args[1] == 'heads' || args[1] == 'h') {
                update = -bet;
                message.channel.send(`**${message.author.username}** bet **${bet.toLocaleString()}** and chose heads... 🪙 **|** the coin lands on **tails**! You lost it all...`);
                client.channels.cache.get('857330940631187526').send(`**${message.author.username} (${message.author.id})** bet **${bet.toLocaleString()}** and won **0**.`);
                client.channels.cache.get('857698338051588127').send(`**${message.author.username} (${message.author.id})** bet **${bet.toLocaleString()}** and won **0**.`);
            }
            else {
                update = -bet;
                message.channel.send(`**${message.author.username}** bet **${bet.toLocaleString()}** and chose tails... 🪙 **|** the coin lands on **heads**! You lost it all...`);
                client.channels.cache.get('857330940631187526').send(`**${message.author.username} (${message.author.id})** bet **${bet.toLocaleString()}** and won **0**.`);
                client.channels.cache.get('857698338051588127').send(`**${message.author.username} (${message.author.id})** bet **${bet.toLocaleString()}** and won **0**.`);
            }
        }
        else if(flip % 2 == 0) {
            if (args[1] == 'heads' || args[1] == 'h') {
                update = bet;
                message.channel.send(`**${message.author.username}** bet **${bet.toLocaleString()}** and chose heads... 🪙 **|** the coin lands on **heads**! You won **${(2 * bet).toLocaleString()}** TMC Cash!`);
                client.channels.cache.get('857330940631187526').send(`**${message.author.username} (${message.author.id})** bet **${bet.toLocaleString()}** and won **${(2 * bet).toLocaleString()}**.`);
                client.channels.cache.get('857698338051588127').send(`**${message.author.username} (${message.author.id})** bet **${bet.toLocaleString()}** and won **${(2 * bet).toLocaleString()}**.`);
            }
            else {
                update = -bet;
                message.channel.send(`**${message.author.username}** bet **${bet.toLocaleString()}** and chose tails... 🪙 **|** the coin lands on **heads**! You lost it all...`);
                client.channels.cache.get('857330940631187526').send(`**${message.author.username} (${message.author.id})** bet **${bet.toLocaleString()}** and won **0**.`);
                client.channels.cache.get('857698338051588127').send(`**${message.author.username} (${message.author.id})** bet **${bet.toLocaleString()}** and won **0**.`);
            }
        }
        else {
            if (args[1] == 'tails' || args[1] == 't') {
                update = bet;
                message.channel.send(`**${message.author.username}** bet **${bet.toLocaleString()}** and chose tails... 🪙 **|** the coin lands on **tails**! You won **${(2 * bet).toLocaleString()}** TMC Cash!`);
                client.channels.cache.get('857330940631187526').send(`**${message.author.username} (${message.author.id})** bet **${bet.toLocaleString()}** and won **${(2 * bet).toLocaleString()}**.`);
                client.channels.cache.get('857698338051588127').send(`**${message.author.username} (${message.author.id})** bet **${bet.toLocaleString()}** and won **${(2 * bet).toLocaleString()}**.`);
            }
            else {
                update = -bet;
                message.channel.send(`**${message.author.username}** bet **${bet.toLocaleString()}** and chose heads... 🪙 **|** the coin lands on **tails**! You lost it all...`);
                client.channels.cache.get('857330940631187526').send(`**${message.author.username} (${message.author.id})** bet **${bet.toLocaleString()}** and won **0**.`);
                client.channels.cache.get('857698338051588127').send(`**${message.author.username} (${message.author.id})** bet **${bet.toLocaleString()}** and won **0**.`);
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