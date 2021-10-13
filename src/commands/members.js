const { Client, Intents, MessageEmbed, Guild } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('members')
        .setDescription('Get members of the server'),
    async execute(interaction) {
        const client = new Client({
            intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_MEMBERS"]
        });

        return interaction.reply('This command is not working!')
    }
}