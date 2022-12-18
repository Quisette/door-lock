const Discord = require("discord.js");


const { Client, GatewayIntentBits } = require('discord.js');
const bot = new Client({ intents: [GatewayIntentBits.Guilds] });
const token = 'MTA1MTUwNTE2MTg3NDQ2MDcwMw.GwVn1Z.N3TQeAS7yPA-VJAm9F--gCQOYGVZGZ9nASQpS0'

bot.once('ready', () => {
  console.log('bot is ready')
})

bot.login(token)
