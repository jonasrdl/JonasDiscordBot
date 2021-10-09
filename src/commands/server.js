const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Get server info'),
    async execute(interaction) {
        return interaction.reply()
    }
}