const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('offend')
        .setDescription('Offend someone')
        .addMentionableOption(option => option
          .setName('user')
          .setDescription('User you want to offend')),
    async execute(interaction) {
        const user = interaction.options.getMentionable('user')

        if (user.user.username === 'Jonas Bot') {
            return interaction.reply('You are stupid, not me!')
        }

        if (user.user.username === 'jvnxs7') {
            return interaction.reply('Nice try, i cannot offend my own creator!')
        }

        if (interaction.user.username === user.user.username) {
            return interaction.reply('Why do you want to offend yourself? But ok, you are stupid!')
        }

        return interaction.reply(`<@${user.user.username}> you are stupid!`)
    }
}