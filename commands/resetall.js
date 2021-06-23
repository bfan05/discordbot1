const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'resetall',
    aliases: ['rsall'],
    permissions: ['ADMINISTRATOR'],
    description: "Reset everyone's TMC Cash",
    async execute(client, message, args, Discord, profileData) {
        let bulkOp = profileModel.initializeOrderedBulkOp();
        let count = 0;
        profileModel.find().forEach(function(data) {
            bulkOp.find({ '_id': doc._id }).updateOne({
                '$set': { coins: 0, total: 0 }
            });
            count++;
            if (count % 100 == 0) {
                bulkOp.execute();
                bulkOp = collection.initializeOrderedBulkOp();
            }
        });

        if (count > 0) bulkOp.execute();
    }
}