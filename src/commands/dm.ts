module.exports = {
  name: 'dm',
  description: 'Send yourself a private message',
  execute(client: any, message: any) {
    message.author.send('Hi! Its me, Jonas Bot :^)');
  },
};
