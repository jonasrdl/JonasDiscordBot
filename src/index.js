const { Client, Collection, Intents, MessageEmbed } = require('discord.js')
const fs = require('fs')
const { token, apiToken, nasaToken } = require('./config.json')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fetch = require('node-fetch')
const PORT = 55689

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

const app = express()
app.use(cors())
app.use(cookieParser())

app.get(`/sendWeatherMessage`, (req, res) => {
    const URL = 'https://wttr.in/Karlsruhe.png?m'
    const channelID = '897428889607999509'
    const channel = client.channels.cache.get(channelID)
    let cookieFromClient = req.cookies['key']

    if (cookieFromClient === apiToken) {
        const embed = new MessageEmbed()
            .setColor('#1f5e87')
            .setTitle('Daily weather report for Karlsruhe')
            .setImage(URL)
            .setTimestamp()

        channel.send({ embeds: [embed] })   

        res.send('Successful')
    } else {
        res.status(401).send('Unauthorized')
    }
})

app.get('/sendNasaPOTD', (req, res) => {
    const URL = `https://api.nasa.gov/planetary/apod?api_key=${nasaToken}`
    const channelID = '898644879784181790'
    const channel = client.channels.cache.get(channelID)
    let cookieFromClient = req.cookies['key']

    if (cookieFromClient === apiToken) {
        fetch (`https://api.nasa.gov/planetary/apod?api_key=${nasaToken}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)

                const embed = new MessageEmbed()
                .setColor('#1f5e87')
                .setTitle('' + data.title)
                .setDescription('' + data.explanation)
                .setImage(data.hdurl)
                .setTimestamp()

            channel.send({ embeds: [embed] })
      })  

        res.send('Successful')
    } else {
        res.status(401).send('Unauthorized')
    }
})

client.commands = new Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.data.name, command)
}

client.once('ready', () => {
    console.log('Bot started!')
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) {
        return
    }

    const command = client.commands.get(interaction.commandName)

    if (!command) {
        return
    }

    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error)
        return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
    }
})

app.listen(PORT, () => {
    console.log('=> Express server running')
})

client.login(token).then(() => console.log('Bot logged in!'))