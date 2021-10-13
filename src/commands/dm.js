const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('name')
        .setDescription('Description'),
    async execute(interaction) {

        return interaction.reply()
    }
}