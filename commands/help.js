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
        .addFields(
            {name: '-join', value: 'Join the bot! Using this command will get you on your way to becoming rich!'},
            {name: '-give @[member] [amount]', value: 'Give another member some of your TMC Cash!'},
            {name: '-balance/bal', value: 'Check your TMC Cash balance!'},
            {name: '-daily', value: 'Claim your daily TMC Cash! Must wait 24 hours before using again.'},
            {name: '-coinflip/cf [amount] [heads/h or tails/t]', value: 'Are you feeling lucky? Coinflip to win some cash!'},
            {name: '-adgive @[member] [amount]', value: 'Only for admins! Reward someone with TMC Cash.'},
            {name: 'reset @[member]', value: 'Someone has been naughty! Reset their cash.'}
        )
        .setImage('https://cdn.discordapp.com/emojis/747124075247173633.png?v=1')
        .setFooter('Make sure to check out the rules channel');

        message.channel.send(newEmbed);
    }
}