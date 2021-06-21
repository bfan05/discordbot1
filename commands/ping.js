module.exports = {
    name: 'ping',
    description: 'replies "pong!"',
    execute(client, message, args, Discord) {
        message.channel.send("pong!");
    }
}