module.exports = {
  name: 'ping',
  description: 'Ping pong',
  execute(client, message, args, Discord) {
    message.channel.send('Test');
  },
};
