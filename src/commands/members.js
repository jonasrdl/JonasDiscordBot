const Discord = require('discord.js');

module.exports = {
  name: 'members',
  description: 'Shows how many members are on this server',
  execute(message, args) {
    const members = message.guild.memberCount;

    let memberCountEmbed = new Discord.MessageEmbed()
      .setColor('#1f5e87')
      .addField('Members', 'This server has ' + members + ' members!');

    message.channel.send(memberCountEmbed);
  },
};
