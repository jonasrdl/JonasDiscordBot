const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('love')
        .setDescription('Calculates the love affinity you have for another person.')
        .addMentionableOption(option => option
          .setName('user')
          .setDescription('User you want to calculate it for')),
    async execute(interaction) {
        const user = interaction.options.getMentionable('user')

        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

        const embed = new MessageEmbed()
            .setColor('#1f5e87')
            .addField(`☁ ${user.user.username} loves ${interaction.member.user.username} this much:`,
            `💟 ${Math.floor(love)}%\n\n${loveLevel}`)
            .setTimestamp()
  
        return interaction.reply({ embeds: [embed] })
    }
}