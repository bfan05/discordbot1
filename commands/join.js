module.exports = {
    name: 'join',
    description: 'join the bot!',
    execute(client, message, args, Discord) {
        message.channel.send(`<@${message.author.id}>, thanks for joining TMC Bot!`);
    }
}