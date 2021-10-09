const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('time')
        .setDescription('Get time'),
    async execute(interaction) {
        return interaction.reply()
    }
}