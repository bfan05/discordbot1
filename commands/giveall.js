const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'resetall',
    aliases: [''],
    permissions: ['ADMINISTRATOR'],
    description: "Reset everyone's TMC Cash",
    async execute(client, message, args, Discord, profileData) {
        const filter = {};
        const update = {
            $set: {
                coins: 1000,
                total: 1000,
            },
        };
        const result = await profileModel.updateMany(filter, update);
    }
}