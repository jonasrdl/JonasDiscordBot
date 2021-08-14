let prefix: string = '.';

module.exports = {
  name: 'info',
  description: 'General info about the Bot',
  execute(client: any, message: any, args: any, Discord: any) {
    let days: number = Math.floor(client.uptime / 86400000);
    let hours: number = Math.floor(client.uptime / 3600000) % 24;
    let minutes: number = Math.floor(client.uptime / 60000) % 60;
    let seconds: number = Math.floor(client.uptime / 1000) % 60;

    let infoEmbed: any = new Discord.MessageEmbed()
      .setColor('#1f5e87')
      .setTitle('Information')
      .addField('Project start', '1. March 2021', false)
      .addField('Serious project?', 'Coming soon :^)', false)
      .addField('Need help?', prefix + 'help', false)
      .addField('Who made me?', prefix + 'author', false)
      .addField('Uptime', days + ' Days, ' + hours + ' Hours, ' + minutes + ' Minutes, ' + seconds + ' Seconds', false)
      .setTimestamp();

    message.channel.send(infoEmbed);
  },
};
