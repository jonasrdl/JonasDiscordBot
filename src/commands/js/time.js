var Discord = require('discord.js');
function time() {
    return new Date().toLocaleTimeString('de', { hour12: false });
}
module.exports = {
    name: 'time',
    description: 'Get the current Time',
    execute: function (client, message, args, Discord) {
        var timeEmbed = new Discord.MessageEmbed().setColor('#1f5e87').setTitle(time());
        message.channel.send(timeEmbed);
    }
};
