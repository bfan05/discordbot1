const profileModel = require('../models/profileSchema')

module.exports = {
    name: 'join',
    aliases: [],
    permissions: ['MANAGE_EMOJIS'],
    description: 'join the bot!',
    execute(client, message, args, Discord, profileModel) {
        message.channel.send(`<@${message.author.id}>, thanks for joining **TMC Bot**!`);
    }
}