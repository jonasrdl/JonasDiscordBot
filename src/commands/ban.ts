module.exports = {
  name: 'ban',
  description: 'Bans mentioned User',
  execute(client: any, message: any, args: any, Discord: any) {
    let target = message.mentions.members.first();

    if (!target) {
      return message.channel.send(`**${message.author.username}**, Please mention the person who you want to ban`);
    }

    if (target.id === message.author.id) {
      return message.channel.send(`**${message.author.username}**, You can not ban yourself`);
    }

    if (!args[1]) {
      return message.channel.send(`**${message.author.username}**, Please Give Reason to ban`);
    }

    if (args[4]) {
      return message.channel.send('Too many arguments!');
    }

    const reason: string[] = args[1] + args[2] + args[3];

    let embed: any = new Discord.MessageEmbed().setTitle('Action: Ban').setDescription(`Banned ${target} (${target.id})`).setDescription(`Reason: ${args[1]} ${args[2]} ${args[3]}`).setColor('#ff2050').setFooter(`Banned by ${message.author.username}`);

    message.channel.send(embed);

    target.ban(args[1]);
  },
};
