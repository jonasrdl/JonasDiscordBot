const Discord = require('discord.js');

function sendPong(): string {
  return 'pong';
}

module.exports = {
  name: 'ping',
  description: 'Ping pong',
  execute(client, message, args, Discord) {
    message.channel.send(sendPong);
  },
};
