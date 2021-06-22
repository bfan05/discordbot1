const profileModel = require("../models/profileSchema");
module.exports = {
  name: "give",
  aliases: [],
  permissions: [],
  description: "Give a player some TMC Cash!",
  async execute(message, args, cmd, client, discord, profileData) {
    if (!args.length) return message.channel.send("You need to mention a player to give them coins!");

    if (!args[1]) return message.channel.send('Please specify how much you want to gamble!');
    if (isNaN(args[1])) return message.reply("Please enter a real number!");
    if (args[1] <= 0) return message.reply("You must give a positive amount, silly!");

    const amount = Math.floor(args[1]);
    const target = message.mentions.users.first();
    if (!target) return message.channel.send("That user does not exist!");

    try {
      const targetData = await profileModel.findOne({ userID: target.id });
      if (!targetData) return message.channel.send(`This user doens't exist in the database. Tell him or her to use the -join command!`);

      await profileModel.findOneAndUpdate(
        {
          userID: target.id,
        },
        {
          $inc: {
            coins: amount,
          },
        }
      );

      return message.channel.send(`This player has been given their coins! ${amount} of coins!`);
    } catch (err) {
      console.log(err);
    }
  },
};