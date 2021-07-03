module.exports = {
    name: 'help',
    aliases: [],
    permissions: [],
    description: 'Provides a list of commands.',
    execute(client, message, args, Discord) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#9CCFE7')
        .setTitle('TMC Bot Help')
        .setDescription("Below are commands and how to use them!")
        .setThumbnail('https://cdn.discordapp.com/emojis/857732279367761940.png?v=1')
        .addFields(
            {name: 'User Commands', value: '``join, give, balance, leaderboard, daily, coinflip``'},
            /*{name: '-join', value: 'Join the bot! Using this command will get you on your way to becoming rich!'},
            {name: '-give/send @[member] [amount]', value: 'Give another member some of your TMC Cash! Let\'s hope they deserved it...'},
            {name: '-balance/bal', value: 'Check your TMC Cash balance!'},
            {name: '-leaderboard/lb [page number]', value: 'Check the TMC Cash leaderboard! Are you #1?'},
            {name: '-daily', value: 'Claim your daily TMC Cash! Resets every day at 12:00 AM PST.'},
            {name: '-coinflip/cf [amount] [h/t]', value: 'Coinflip some TMC Cash and get rich!'},
            {name: '\u200B', value: '\u200B'},*/
            {name: 'Action Commands', value: '``hug, kiss, spank, slap, kick, throw, lick``'},
            /*{name: '\u200B', value: '\u200B'},*/
            {name: 'Admin Commands', value: '``adtake, adgive, reset``'},
            /*{name: '-adtake @[member] [amount]', value: 'Take some TMC Cash from a member. No regrets!'},
            {name: '-adgive @[member] [amount]', value: 'Reward someone with TMC Cash!'},
            {name: '-reset @[member]', value: 'Someone has been naughty! Reset their cash.'},*/
        )
        .setFooter('Created by bfan#0125');

        message.channel.send(newEmbed);
    }
}