const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Info about the bot'),
    async execute(interaction) {
        return interaction.reply()
    }
}