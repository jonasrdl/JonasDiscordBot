import { Command } from '../../structures/Command';
import { MessageEmbed } from 'discord.js';
import {client} from "../../index";

export default new Command({
    name: 'server',
    description: 'Get information about the server',
    run: async ({ interaction }) => {
        if (!interaction.guild) {
            return interaction.followUp(
                'You cannot use this command in private chat!'
            );
        }

        const embed = new MessageEmbed()
            .setColor('#1f5e87')
            .setTitle('Server information')
            .addField('Name', `${interaction.guild.name}`, false)
            .addField('Members', `${interaction.guild.memberCount}`)
            .addField('Created at', `${interaction.guild.createdAt}`, false)
            .addField('Server Owner', `${client.users.cache.find(user => user.id === interaction.guild.ownerId)}`, false)
            .setImage(interaction.guild.iconURL())
            .setTimestamp();

        return interaction.followUp({ embeds: [embed] });
    }
});
