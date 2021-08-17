module.exports = {
  name: 'offend',
  description: 'Offend someone',
  execute(client: any, message: any, args: any, Discord: any) {
    if (!message.member.user.bot && message.guild) {
      if (message.mentions.users.first()) {
        const userID = message.mentions.users.first();

        message.channel.send(`${userID.username}` + ' is stupid :^)');
      }
    }
  },
};
