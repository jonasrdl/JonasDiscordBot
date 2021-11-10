const { Client, Collection, Intents, MessageEmbed, Guild } = require('discord.js')
const fs = require('fs')
const { token, apiToken, nasaToken, weatherApiToken, guildId, userID } = require('./config.json')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fetch = require('node-fetch')
const puppeteer = require('puppeteer')
const { default: axios } = require('axios')
const PORT = 55689

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

const app = express()
app.use(cors())
app.use(cookieParser())

app.get(`/isOnline`, (req, res) => {
  res.sendStatus(200)
})

app.get(`/sendWeatherMessage`, (req, res) => {
  const channelID = '897428889607999509'
  const channel = client.channels.cache.get(channelID)
  let cookieFromClient = req.cookies['key']

  if (cookieFromClient === apiToken) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Karlsruhe&appid=${weatherApiToken}&units=metric`
    )
      .then((data) => data.json())
      .then((data) => {
        const temperature = data.main.temp
        const temperatureFeelsLike = data.main.feels_like
        const guild = client.guilds.cache.get(guildId)

        if (temperature <= 6) {
          guild.members.fetch(userID).then((user) => {
            user.send('The temperature is under 6°C, its cold!')
          })
        }

        if (data.weather[0].main === 'Rain') {
          guild.members.fetch(userID).then((user) => {
            user.send('Watch out, its raining!')
          })
        }

        const embed = new MessageEmbed()
          .setColor('#1f5e87')
          .setTitle(`Daily weather for Karlsruhe`)
          .addField('Temperature', `${temperature}°C`, false)
          .addField('Feels like', `${temperatureFeelsLike}°C`, false)
          .addField('Weather', `${data.weather[0].main}`)
          .setTimestamp()

        channel.send({ embeds: [embed] })
      })

    res.send('Successful')
  } else {
    res.status(401).send('Unauthorized')

    channel.send('Weather could not be sent. There was a problem.')
  }
})

// ----------------------------------------------- //

async function getCoronaData() {
  try {
    const URL = 'https://corona.karlsruhe.de/'
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    let spanElement;

    await page.goto(URL)

    spanElement = await page.$x('/html/body/article/div[3]/div/div[3]/p[2]/strong')
    spanElement = spanElement.pop()
    spanElement = await spanElement.getProperty('innerText');
    spanElement = await spanElement.jsonValue();

    console.log(parseInt(spanElement))
} catch (error) {
    console.log(error)
  }
}

// ----------------------------------------------- //

app.get('/incidence', (req, res) => {
  const incidence = getCoronaData()

  const embed = new MessageEmbed()
    .setColor('#1f5e87')
    .setTitle(`${incidence}`)
    .setTimestamp()

  channel.send({ embeds: [embed] })
})

app.get('/sendNasaPOTD', (req, res) => {
  const URL = `https://api.nasa.gov/planetary/apod?api_key=${nasaToken}`
  const channelID = '898644879784181790'
  const channel = client.channels.cache.get(channelID)
  let cookieFromClient = req.cookies['key']

  if (cookieFromClient === apiToken) {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaToken}`)
      .then((response) => response.json())
      .then((data) => {
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
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.data.name, command)
}

client.once('ready', () => {
  console.log('Bot started!')
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return
  }

  const command = client.commands.get(interaction.commandName)

  if (!command) {
    return
  }

  try {
    await command.execute(interaction, client)
  } catch (error) {
    return interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    })
  }
})

app.listen(PORT, () => {
  console.log('=> Express server running')
})

client.login(token).then(() => console.log('Bot logged in!'))
