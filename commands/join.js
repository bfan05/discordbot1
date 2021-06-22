const profileModel = require('../models/profileSchema')

module.exports = {
    name: 'join',
    description: 'join the bot!',
    execute(client, message, args, Discord, profileModel) {
        message.channel.send(`<@${message.author.id}>, thanks for joining **TMC Bot**! Enjoy a free **10** TMC Cash!`);
    }
}