function randomNumber(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

module.exports = {
    name: 'roll',
    description: 'gives a random number in a range',
    execute(client, message, args, Discord) {
        if (args[0] && args[1]) {
            if (isNaN(args[0]) || isNaN(args[1])) return message.channel.send('must enter real numbers!');
            if (args[0] > args[1]) return message.channel.send('must be a valid range!');
            let num = randomNumber(parseInt(args[0]), parseInt(args[1]));
            message.channel.send('**' + message.author.username + '**, you rolled a **' + num + '**!');
        }
        else {
            message.channel.send('must enter arguments!');
        }
    }
}