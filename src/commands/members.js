module.exports = {
  name: 'members',
  description: 'Shows how many members are on this server',
  execute(client, message, args, Discord) {
    const members = message.guild.memberCount;

    let memberCountEmbed = new Discord.MessageEmbed()
      .setColor('#1f5e87')
      .addField('Members', 'This server has ' + members + ' members!');

    message.channel.send(memberCountEmbed);
  },
};
