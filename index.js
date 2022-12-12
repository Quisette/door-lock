const Discord = require("discord.js");


const { Client, GatewayIntentBits } = require('discord.js');
const bot = new Client({ intents: [GatewayIntentBits.Guilds] });
//const bot = new Discord.Client();
const token = 'MTA1MTUwNTE2MTg3NDQ2MDcwMw.GwVn1Z.N3TQeAS7yPA-VJAm9F--gCQOYGVZGZ9nASQpS0'

bot.once('ready', () => {
  console.log('bot is ready')
})

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
		data: new SlashCommandBuilder()
			.setName('ping')
			.setDescription('Replies with Pong!'),
		async execute(interaction) {
					await interaction.reply('Pong!');
				},
};
const wait = require('node:timers/promises').setTimeout;


bot.on(Events.InteractionCreate, async interaction => {
		if (!interaction.isChatInputCommand()) return;

		if (interaction.commandName === 'ping') {
					await interaction.reply('Pong!');
					await wait(2000);
					await interaction.editReply('Pong again!');
				}
});
bot.login(token)
