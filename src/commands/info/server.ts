import { Command } from '../../structures/Command'
import { MessageEmbed } from 'discord.js'

export default new Command({
  name: 'server',
  description: 'Get information about the server',
  run: async ({ client, interaction }) => {
    const guild = client.guilds.cache.get(process.env.guildId)

    const embed = new MessageEmbed()
      .setColor('#1f5e87')
      .setTitle('Server information')
      .addField('Name', `${guild.name}`, false)
      .addField('Members', `${guild.memberCount}`)
      .addField('Created at', `${guild.createdAt}`, false)
      .setImage(guild.iconURL())
      .setTimestamp()

    return interaction.followUp({ embeds: [embed] })
  },
})
