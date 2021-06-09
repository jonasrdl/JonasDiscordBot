const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
  name: 'offend',
  description: 'Offend someone',
  execute(client, message, args, Discord) {
    if (!message.member.user.bot && message.guild) {
      if (message.mentions.users.first()) {
        let user = message.mentions.users.first();

        message.channel
          .send(`${user}` + ' is stupid :^)');
      }
    }
  },
};
