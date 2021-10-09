const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('members')
        .setDescription('Get members of the server'),
    async execute(interaction) {
        return interaction.reply()
    }
}