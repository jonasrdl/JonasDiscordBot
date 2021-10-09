const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get a users avatar')
        .addMentionableOption(option => 
            option.setName('user')
                .setDescription('get user')
                .setRequired(true)),
    async execute(interaction) {
        const avatar = interaction.options.getMentionable()

        return interaction.reply(attachment)
    }
}