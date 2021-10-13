const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const fetch = require('node-fetch');

const removeQuotes = str => {
    return str.replace(/^"(.+(?="$))"$/, '$1')
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random')
        .setDescription('Get random user from API'),
    async execute(interaction) {
        fetch(`https://api.randomuser.me/`)
          .then(response => response.json())
          .then(data => {
              const firstName = removeQuotes(JSON.stringify(data.results[0].name.first))
              const lastName = removeQuotes(JSON.stringify(data.results[0].name.last))
              const age = removeQuotes(JSON.stringify(data.results[0].dob.age))
              const picture = data.results[0].picture.large

              const embed = new MessageEmbed()
                .setColor('#1f5e87')
                .setURL('https://api.randomuser.me/')
                .setTitle('Random User: ')
                .addField('First name: ', firstName, false)
                .addField('Last name: ', lastName, false)
                .addField('Age: ', age, false)
                .setImage(picture)
                .setTimestamp()

              return interaction.reply({ embeds: [embed] })
          })
    }
}