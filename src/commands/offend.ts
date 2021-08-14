module.exports = {
  name: 'offend',
  description: 'Offend someone',
  execute(client, message, args, Discord) {
    if (!message.member.user.bot && message.guild) {
      if (message.mentions.users.first()) {
        const userID = message.mentions.users.first();

        message.channel.send(`${userID.username}` + ' is stupid :^)');
      }
    }
  },
};
