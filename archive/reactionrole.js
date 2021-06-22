module.exports = {
    name: 'reactionrole',
    aliases: [],
    permissions: [],
    description: 'sets up a reaction role message!',
    async execute(message, args, Discord, client) {
        const channel = '856402764834144266'
        const reaperRole = message.guild.roles.cache.find(role => role.name === 'reaper');
        const greedControlRole = message.guild.roles.cache.find(role => role.name === 'greed control');

        const reaperEmoji = '🟦';
        const greedControlEmoji = '🟥';

        let embed = new Discord.MessageEmbed()
            .setColor('#9CCFE7')
            .setTitle('First Reaction Role!')
            .setDescription("Choose the reaper or greed control role!\n\n"
                + `${reaperEmoji} for reaper\n`
                + `${greedControlEmoji} for greed control`);

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(reaperEmoji);
        messageEmbed.react(greedControlEmoji);

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name == reaperEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(reaperRole);
                }
                if (reaction.emoji.name == greedControlEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(greedControlRole);
                }
            } else return;
        });
        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name == reaperEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(reaperRole);
                }
                if (reaction.emoji.name == greedControlEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(greedControlRole);
                }
            } else return;
        });
    }
}