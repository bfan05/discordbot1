module.exports = {
    name: 'yawn',
    aliases: [],
    permissions: [],
    description: 'Are you tired?',
    async execute(client, message, args, Discord) {
        message.channel.send(`<:zzmilkyawn:857418851757850685>`);
    }
}