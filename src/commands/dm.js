module.exports = {
  name: 'dm',
  description: 'Send yourself a private message',
  execute(message, args) {
    message.author.send('Hi! Its me, Jonas Bot :^)');
  },
};
