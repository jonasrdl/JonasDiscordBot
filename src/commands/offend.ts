module.exports = {
  name: 'offend',
  description: 'Offend someone',
  execute(client, message, args, Discord) {
    if (!message.member.user.bot && message.guild) {
      if (message.mentions.users.first()) {
        let user: any = message.mentions.users.first();

        message.channel.send(`${user}` + ' is stupid :^)');
      }
    }
  },
};
