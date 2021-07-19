const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'addcollectible',
    aliases: [''],
    permissions: ['ADMINISTRATOR'],
    description: "Add a collectible",
    async execute(client, message, args, Discord, profileData) {
        const filter = {};
        const update = {
            $unset: {
                'tags.copperkey': 0,
                'tags.crystalkey': 0,
                'tags.jadekey': 0,
                'tags.easteregg': 0,
            },
        };
        const result = await profileModel.updateMany(filter, update);
        message.channel.send('Collectible removed!');
    }
}