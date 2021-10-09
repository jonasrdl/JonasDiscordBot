const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Get random quote'),
    async execute(interaction) {
        return interaction.reply()
    }
}