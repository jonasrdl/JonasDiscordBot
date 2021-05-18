module.exports = {
  name: 'dm',
  description: 'Send yourself a private message',
  execute(client, message, args, Discord) {
    message.author.send('Hi! Its me, Jonas Bot :^)');
  },
};
