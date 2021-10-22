const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get avatar from someone')
        .addMentionableOption(option => option
          .setName('user')
          .setDescription('User you want to get avatar from')),
    async execute(interaction) {
        const user = interaction.options.getMentionable('user')

        const embed = new MessageEmbed()
            .setColor('#1f5e87')
            .setTitle('Avatar')
            .setImage(user.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setTimestamp();
  
        return interaction.reply({ embeds: [embed] })
    }
}