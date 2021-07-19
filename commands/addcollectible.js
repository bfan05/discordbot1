const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'addcollectible',
    aliases: [''],
    permissions: ['ADMINISTRATOR'],
    description: "Add a collectible",
    async execute(client, message, args, Discord, profileData) {
        const filter = {};
        /*const update = {
            $set: {
                crystalkey: 0,
                jadekey: 0,
                easteregg: 0,
            },
        };*/
        const result = await profileModel.updateMany({}, {$unset: {crystalkey: 1, copperkey: 1, jadekey: 1, easteregg: 1}}, false, true);
        message.channel.send('Collectible removed!');
    }
}