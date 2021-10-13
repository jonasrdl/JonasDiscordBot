const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

const quotes = ['Any time you try to create an Internet meme, automatic fail. Thats like the worst thing you can do.', 'I feel in todays time, you are truly successful if a meme is based on you.', 'Memes just show that people are engaged about something. A meme is just a little inside joke for a group of people that care about a certain thing.', 'I have a great sense of humor, I mean even when my meme came out I reposted it. I didnt care. I was laughing, too!', 'I dont even know what memes are, Im, like, an old person, so I dont really know what a meme is.', 'I am so happy to be a meme.', 'Some people only recognize me for that - aint you the meme guy?', 'I run a meme type of account on Twitter; I know what my audience is looking for.'];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Get random quote'),
    async execute(interaction) {
        const randomQuote = Math.floor(Math.random() * quotes.length);

        const embed = new MessageEmbed()
          .setColor('#1f5e87')
          .setTitle(quotes[randomQuote])
          .setTimestamp();

        return interaction.reply({ embeds: [embed] })
    }
}