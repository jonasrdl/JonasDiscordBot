function date(): string {
  return new Date().toLocaleDateString('de');
}

module.exports = {
  name: 'date',
  description: 'Get the current Date',
  execute(client: any, message: any, args: any, Discord: any) {
    let dateEmbed: any = new Discord.MessageEmbed().setColor('#1f5e87').setTitle(date());

    message.channel.send(dateEmbed);
  },
};