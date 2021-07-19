require('dotenv').config();

const cooldowns = new Map();

const profileModel = require('../../models/profileSchema');
module.exports = async (Discord, client, message) => {
    const prefix = process.env.bot_prefix;
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    let profileData;
    try {
        profileData = await profileModel.findOne({ userID: message.author.id });
        if (!profileData) {
            let profile = await profileModel.create({
                userID: message.author.id,
                serverID: message.guild.id,
                usernm: message.author.username,
                coins: 0,
                total: 0,
                dogs: 0,
                cloak: 0,
                stone: 0,
                wand: 0,
                master: 0,
            });
            profile.save();
        }
    } catch (err) {
        console.log(err)
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    if (message.author.id != '692851547062665317' && message.author.id != '777641801212493826') {
        return message.channel.send('New features are being added to the bot! Please be patient, it will be back up soon.')
    }

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if (!command) message.reply("this command doesn't exist!");
    else {
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }
    
        const current_time = Date.now();
        const time_stamps = cooldowns.get(command.name);
        const cooldown_amount = (command.cooldown) * 1000;
    
        if (time_stamps.has(message.author.id)) {
            const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;
    
            if (current_time < expiration_time) {
                const time_left = Math.floor((expiration_time - current_time) / 1000);
                const hours_left = Math.floor(time_left / 3600);
                const minutes_left = Math.floor((time_left - 3600 * hours_left) / 60);
                const seconds_left = Math.floor((time_left - (3600 * hours_left + 60 * minutes_left)));
                
                if (cmd == 'daily') {
                    return message.channel.send(`**${message.author.username}**, your daily is not ready! Daily resets at **12:00 AM PST** every day.`);
                } else {
                    return message.channel.send(`**${message.author.username}**, please wait **${seconds_left}** seconds before using that command again!`);
                }
                
            }
        }
    
        time_stamps.set(message.author.id, current_time);
        setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);
    
        const validPermissions = [
            "CREATE_INSTANT_INVITE",
            "KICK_MEMBERS",
            "BAN_MEMBERS",
            "ADMINISTRATOR",
            "MANAGE_CHANNELS",
            "MANAGE_GUILD",
            "ADD_REACTIONS",
            "VIEW_AUDIT_LOG",
            "PRIORITY_SPEAKER",
            "STREAM",
            "VIEW_CHANNEL",
            "SEND_MESSAGES",
            "SEND_TTS_MESSAGES",
            "MANAGE_MESSAGES",
            "EMBED_LINKS",
            "ATTACH_FILES",
            "READ_MESSAGE_HISTORY",
            "MENTION_EVERYONE",
            "USE_EXTERNAL_EMOJIS",
            "VIEW_GUILD_INSIGHTS",
            "CONNECT",
            "SPEAK",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MOVE_MEMBERS",
            "USE_VAD",
            "CHANGE_NICKNAME",
            "MANAGE_NICKNAMES",
            "MANAGE_ROLES",
            "MANAGE_WEBHOOKS",
            "MANAGE_EMOJIS",
        ]
    
        if (command.permissions.length) {
            let invalidPerms = [];
            for (const perm of command.permissions) {
                if (!validPermissions.includes(perm)) {
                    return console.log(`Invalid Perm ${perm}`);
                }
                if (!message.member.hasPermission(perm)) {
                    invalidPerms.push(perm);
                    break;
                }
            }
            if (invalidPerms.length) {
                return message.channel.send(`Missing permissions: \`${invalidPerms}\``);
            }
        }
        try {
            command.execute(client, message, args, Discord, profileData);
        } catch (err) {
            console.log(err);
            message.reply("There was a problem using that command!");
        }
        
    }
}