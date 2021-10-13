const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('If you need help'),
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setColor('#1f5e87')
            .setTitle('Author')
            .setURL('https://github.com/jonasrdl')
            .setAuthor('Jonas', 'https://cdn.discordapp.com/avatars/209945797918195712/9db3ef1798f32759e67c4f39cb1ea875.png?size=128')
            .setDescription('Help')
            .addField('/' + 'offend @[Username]', 'Offend someone', false)
            .addField('/' + 'avatar @[Username]', 'Get a users avatar', false)
            .addField('/' + 'time', 'Get the current Time', false)
            .addField('/' + 'date', 'Get the current Date', false)
            .addField('/' + 'dm', 'Send yourself a private message', false)
            .addField('/' + 'quote', 'Get a random Quote', false)
            .addField('/' + 'temperature [City]', 'Get the temperature of any city', false)
            .addField('/' + 'author', 'Infos about the author', false)
            .addField('/' + 'info', 'General info about the Bot', false)
            .addField('/' + 'members', 'Shows how many members are on this server', false)
            .addField('/' + 'calculator [number + number]', 'Calculate two numbers')
            .setTimestamp();

        return interaction.reply({ embeds: [embed] })
    }
}