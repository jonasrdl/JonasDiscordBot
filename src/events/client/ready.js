module.exports = (Discord, client) => {
  console.log('Bot is online!');

  client.user.setActivity('.help', {type: 'PLAYING'}).then(() => console.log('Activity set!'));
};