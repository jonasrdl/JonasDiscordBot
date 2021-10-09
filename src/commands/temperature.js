const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('temperature')
        .setDescription('Get temperature from a city'),
    async execute(interaction) {
        return interaction.reply()
    }
}