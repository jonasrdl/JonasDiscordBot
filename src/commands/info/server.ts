import { Command } from '../../structures/Command'
import { MessageEmbed } from 'discord.js'

export default new Command({
  name: 'server',
  description: 'Get information about the server',
  run: async ({ interaction }) => {
    const embed = new MessageEmbed()
      .setColor('#1f5e87')
      .setTitle('Server information')
      .addField('Name', `${interaction.guild.name}`, false)
      .addField('Members', `${interaction.guild.memberCount}`)
      .addField('Created at', `${interaction.guild.createdAt}`, false)
      .setImage(interaction.guild.iconURL())
      .setTimestamp()

    return interaction.followUp({ embeds: [embed] })
  }
})
