module.exports = {
  name: 'server',
  description: 'Info about the Server',
  execute(client, message, args, Discord) {
    const icon = message.guild.displayAvatarURL;

    let serverEmbed = new Discord.MessageEmbed()
      .setTitle('Server Info')
      .setThumbnail(icon)
      .setColor('#1f5e87')
      .addField('Server Name', message.guild.name, false)
      .addField('Created at', message.guild.createdAt, false)
      .addField('You Joined', message.member.joinedAt, false)
      .addField('Total members', message.guild.memberCount, false)
      .addField('Owner', message.guild.owner, false);

    message.channel.send(serverEmbed);
  },
};
