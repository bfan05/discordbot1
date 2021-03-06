module.exports = {
    name: 'help',
    aliases: [],
    permissions: [],
    description: 'Provides a list of commands.',
    execute(client, message, args, Discord) {
        if (!args.length) {
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#9CCFE7')
            .setTitle('TMA Bot Help')
            .setDescription("Below are TMA Bot commands! Type -help [command] for command specific help.")
            .setThumbnail('https://cdn.discordapp.com/emojis/857732279367761940.png?v=1')
            .addFields(
                {name: '🔧 User Commands', value: '``join, give, balance, leaderboard, daily, coinflip``'},
                {name: '🤜 Action Commands', value: '``hug, kiss, slap, punch, throw, lick, spank``'},
                {name: '👮 Admin Commands', value: '``adtake, adgive, reset``'},
            )
            .setFooter('Created by bfan#0125');

            return message.channel.send(newEmbed);
        }

        let map = new Map();
        map.set('join', ['join', 'Join the bot! Using this command will get you on your way to becoming rich!'])
        map.set('give', ['give/send @[member] [amount]', 'Give another member some of your TMA Cash! Let\'s hope they deserved it...', '<:KL1Money:860950566268043305>']);
        map.set('balance', ['balance/bal', 'Check your TMA Cash balance!', '💰']);
        map.set('leaderboard', ['leaderboard/lb [page number]', 'Check the TMA Cash leaderboard! Are you #1?', '🔝']);
        map.set('daily', ['daily', 'Claim your daily TMA Cash! Resets every day at 12:00 AM PST.', '⏰']);
        map.set('coinflip', ['coinflip/cf [amount] [h/t]', 'Coinflip some TMA Cash and get rich!', '🪙']);
        map.set('adtake', ['adtake @[member] [amount]', 'Take some TMA Cash from a member. No regrets!', '']);
        map.set('adgive', ['adgive @[member] [amount]', 'Reward someone with TMA Cash!', '']);
        map.set('reset', ['reset @[member]', 'Someone has been naughty! Reset their cash.', '']);
        map.set('hug', ['hug @[member]', 'Hug someone!', '🤗']);
        map.set('kiss', ['kiss @[member]', 'Give someone a big kiss!', '💋']);
        map.set('slap', ['slap @[member]', 'Slap someone!', '<a:TMA_MaiSlapOwO:834498233262800896>']);
        map.set('punch', ['punch @[member]', 'Punch another member!', '🤜']);
        map.set('throw', ['throw @[member]', 'Throw someone!', '<a:throw:860952026590871582>']);
        map.set('lick', ['lick @[member]', 'Give someone a wet lick!', '👅']);
        map.set('spank', ['spank @[member]', 'Give someone a fat spank!', '<a:ANIspank:861024140383092746>']);

        if (!map.has(args[0])) return message.channel.send('That command does not exist!');
        else {
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#9CCFE7')
            .setTitle('TMA Bot Help')
            .setDescription(`${args[0]} help ${map.get(args[0])[2]}`)
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