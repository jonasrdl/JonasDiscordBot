module.exports = {
  name: 'dm',
  description: 'Send yourself a private message',
  execute(client, message) {
    message.author.send('Hi! Its me, Jonas Bot :^)');
  },
};
