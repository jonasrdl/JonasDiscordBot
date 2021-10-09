const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random')
        .setDescription('Get random user from API'),
    async execute(interaction) {
        return interaction.reply()
    }
}