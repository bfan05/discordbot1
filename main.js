const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = 'sig';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('SigmaBot is online!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'command'){
        client.commands.get('command').execute(message, args, Discord);
    } else if(command == 'invite') {
        client.commands.get('invite').execute(message, args, Discord);
    } else if(command == 'coinflip') {
        client.commands.get('coinflip').execute(message, args, Discord);
    } else if(command == 'ping') {
        client.commands.get('ping').execute(message, args, Discord);
    } 
});

client.login(process.env.token);