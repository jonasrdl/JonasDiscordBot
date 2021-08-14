module.exports = {
  name: 'kick',
  description: 'Kicks mentioned User',
  execute(client: any, message: any, args: any, Discord: any) {
    let target: any = message.mentions.members.first();

    if (!target) {
      return message.channel.send(`**${message.author.username}**, Please mention the person who you want to kick`);
    }

    if (target.id === message.author.id) {
      return message.channel.send(`**${message.author.username}**, You can not kick yourself`);
    }

    if (!args[1]) {
      return message.channel.send(`**${message.author.username}**, Please Give Reason to kick`);
    }

    if (args[4]) {
      return message.channel.send('Too many arguments!');
    }

    const reason: string[] = args[1] + args[2] + args[3];

    let embed = new Discord.MessageEmbed().setTitle('Action: Kick').setDescription(`Kicked ${target} (${target.id})`).setDescription(`Reason: ${args[1]} ${args[2]} ${args[3]}`).setColor('#ff2050').setFooter(`Kicked by ${message.author.username}`);

    message.channel.send(embed);

    target.kick(args[1]);
  },
};
