module.exports = {
  name: 'ping',
  description: 'Ping pong',
  execute(client: any, message: any, args: any, Discord: any) {
    message.channel.send('Pong');
  },
};
