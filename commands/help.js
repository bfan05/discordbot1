module.exports = {
    name: 'help',
    aliases: [],
    permissions: [],
    description: 'Provides a list of commands.',
    execute(client, message, args, Discord) {
        if (!args.length) {
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#9CCFE7')
            .setTitle('TMC Bot Help')
            .setDescription("Below are commands and how to use them!")
            .setThumbnail('https://cdn.discordapp.com/emojis/857732279367761940.png?v=1')
            .addFields(
                {name: 'User Commands', value: '``join, give, balance, leaderboard, daily, coinflip``'},
                {name: 'Action Commands', value: '``hug, kiss, spank, slap, kick, throw, lick``'},
                {name: 'Admin Commands', value: '``adtake, adgive, reset``'},
            )
            .setFooter('Created by bfan#0125');

            message.channel.send(newEmbed);
        }

        let map = new Map();
        map.set('join', ['-join', 'Join the bot! Using this command will get you on your way to becoming rich!'])
        map.set('give', ['give/send @[member] [amount]', 'Give another member some of your TMC Cash! Let\'s hope they deserved it...']);
        map.set('balance', ['balance/bal', 'Check your TMC Cash balance!']);
        map.set('leaderboard', ['leaderboard/lb [page number]', 'Check the TMC Cash leaderboard! Are you #1?']);
        map.set('daily', ['daily', 'Claim your daily TMC Cash! Resets every day at 12:00 AM PST.']);
        map.set('coinflip', ['coinflip/cf [amount] [h/t]', 'Coinflip some TMC Cash and get rich!']);
        map.set('adtake', ['adtake @[member] [amount]', 'Take some TMC Cash from a member. No regrets!']);
        map.set('adgive', ['adgive @[member] [amount]', 'Reward someone with TMC Cash!']);
        map.set('reset', ['reset @[member]', 'Someone has been naughty! Reset their cash.']);

        if (!map.has(args[0])) return message.channel.send('That command does not exist!');
        else {
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#9CCFE7')
            .setTitle('TMC Bot Help')
            .setDescription(`${args[0]} help`)
            .setThumbnail('https://cdn.discordapp.com/emojis/857732279367761940.png?v=1')
            .addFields(
                {name: 'How to use', value: `-${map.get(args[0])[0]}`},
                {name: 'Purpose', value: `${map.get(args[0])[1]}`},
            )
            .setFooter('Created by bfan#0125');

            message.channel.send(newEmbed);
        }
    }
}