module.exports = {
  name: 'avatar',
  description: 'Get a users avatar',
  execute(client, message, args, Discord) {
    if (message.mentions.users.first()) {
      let user = message.mentions.users.first();
      let attachment = new Discord.MessageAttachment(user.avatarURL());

      message.reply(attachment).then(() => console.log('Attachment sent'));
    } else {
      let attachment = new Discord.MessageAttachment(message.member.user.avatarURL());

      message.reply(attachment).then(() => console.log('.avatar sent'));
    }
  },
};
