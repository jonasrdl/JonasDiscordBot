import { GuildMember, MessageEmbed, TextChannel } from 'discord.js';
import { Event } from '../structures/Event';
import { client } from '..';
import config from '../config.json';
import { Config } from '../typings/config';
import {
  getElapsedTimeInSeconds,
  getTimestampFormat,
  humanizeElapsedTime,
} from '../util/Util';

export default new Event('guildMemberRemove', async (member: GuildMember) => {
  const channel = await client.channels.fetch(process.env.AUDIT_LOG_CHANNEL_ID);

  const embed = new MessageEmbed()
    .setColor((config as Config).positiveColor)
    .setDescription(
      `${member.user}\nCreated account: ${getTimestampFormat(
        member.user.createdAt,
      )}`,
    )
    .setImage(member.user.displayAvatarURL({ dynamic: true }))
    .setFooter(
      `Left the server after ${humanizeElapsedTime(
        getElapsedTimeInSeconds(member.joinedAt),
      )}`,
      member.user.displayAvatarURL({ dynamic: true }),
    )
    .setTimestamp();

  (channel as TextChannel).send({ embeds: [embed] });
});
