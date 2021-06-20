module.exports = {
    name: 'clear',
    description: 'clear messages',
    async execute(message, args, Discord) {
        if (!args[0]) return message.reply("please specify the amount of messages you want to clear!");
        if (!isInteger(args[0])) return message.reply("please enter a real number!");
        if (args[0] > 100) return message.reply("you cannot delete more than 100 messages!");
        if (args[0] < 1) return message.reply("you must delete at least one message!");
        await message.channel.messages.fetch({limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages);
        });
    }
}