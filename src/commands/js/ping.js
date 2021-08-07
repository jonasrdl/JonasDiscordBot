var Discord = require('discord.js');
function sendPong() {
    return 'pong';
}
module.exports = {
    name: 'ping',
    description: 'Ping pong',
    execute: function (client, message, args, Discord) {
        message.channel.send(sendPong);
    }
};
