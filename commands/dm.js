module.exports = {
    name: 'dm',
    description: 'this command dms a member',
    execute(message, args) {
        const member = message.mentions.users.first();
        const memberTarget = message.guild.members.cache.get(member.id);
        memberTarget.send("hi");
    }
}