module.exports = {
    name: 'ping',
    description: 'replies "pong!"',
    execute(message, args, Discord) {
        message.channel.send("pong!");
    }
}