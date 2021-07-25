const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'addcollectible',
    aliases: [''],
    permissions: ['ADMINISTRATOR'],
    description: "Add a collectible",
    async execute(client, message, args, Discord, profileData) {
        const filter = {};
        const update = {
            $set: {
                cloak: 0,
                stone: 0,
                wand: 0,
                master: 0,
            }
        };
        const result = await profileModel.updateMany(filter, update);
        message.channel.send('Collectible added!');
    }
}