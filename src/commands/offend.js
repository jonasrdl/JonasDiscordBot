const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('offend')
        .setDescription('Offend someone'),
    async execute(interaction) {
        return interaction.reply()
    }
}