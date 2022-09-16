import { Event } from '../structures/Event';
import { GuildMember, MessageEmbed, TextChannel } from 'discord.js';
import config from '../config.json';
import { Config } from '../typings/config';
import { client } from '..';
import { getTimestampFormat } from '../util/Util';

export default new Event('guildMemberAdd', async (member: GuildMember) => {
  const channel = await client.channels.fetch(process.env.AUDIT_LOG_CHANNEL_ID);

  const embed = new MessageEmbed()
    .setColor((config as Config).positiveColor)
    .setDescription(
      `${member.user}\nCreated account: ${getTimestampFormat(
        member.user.createdAt,
      )}`,
    )
    .setImage(member.user.displayAvatarURL({ dynamic: true }))
    .setFooter('Joined the server')
    .setTimestamp();

  (channel as TextChannel).send({ embeds: [embed] });
});
