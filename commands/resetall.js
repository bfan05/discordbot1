const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'resetall',
    aliases: ['rsall'],
    permissions: ['ADMINISTRATOR'],
    description: "Reset everyone's TMC Cash",
    async execute(client, message, args, Discord, profileData) {
        // let bulkOp = profileModel.initializeOrderedBulkOp();
        // let count = 0;

        const response = await profileModel.find().then((data) => {
            data.forEach((prof) => {
                profileModel.updateOne({ _id: prof._id }, { $set: { coins: 0 }})
            });
        }); 
        
        message.channel.send('Reset complete!');

        /*profileModel.find().forEach(function(data) {
            bulkOp.find({ '_id': doc._id }).updateOne({
                '$set': { coins: 0, total: 0 }
            });
            count++;
            if (count % 100 == 0) {
                bulkOp.execute();
                bulkOp = collection.initializeOrderedBulkOp();
            }
        });

        if (count > 0) bulkOp.execute();*/
    }
}