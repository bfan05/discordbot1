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
        .setThumbnail('http://www.simpleimageresizer.com/_uploads/photos/fd03d8aa/tmc_2_15.gif')
        .addFields(
            {name: '-join', value: 'Join the bot! Using this command will get you on your way to becoming rich!'},
            {name: '-give/send @[member] [amount]', value: 'Give another member some of your TMC Cash! Let\'s hope they deserved it...'},
            {name: '-balance/bal', value: 'Check your TMC Cash balance!'},
            {name: '-leaderboard/lb [page number]', value: 'Check the TMC Cash leaderboard! Are you #1?'},
            {name: '-daily', value: 'Claim your daily TMC Cash! Must wait 24 hours before using again.'},
            {name: '-adtake @[member] [amount]', value: 'Only for admins. Take some TMC Cash from a member. No regrets!'},
            {name: '-adgive @[member] [amount]', value: 'Only for admins. Reward someone with TMC Cash!'},
            {name: '-reset @[member]', value: 'Only for admins. Someone has been naughty! Reset their cash.'},
            {name: '-resetall', value: 'Only for admins. Reset everyone and enjoy the chaos!'},
        )
        .setFooter('Created by bfan#0125');

        message.channel.send(newEmbed);
    }
}