module.exports = (Discord, client) => {
  console.log('Bot is online!');

  client.user.setActivity('.help', {type: 'PLAYING'}).then(activity => console.log('Activity set!'));
};
