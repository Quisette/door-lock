const { SlashCommandBuilder } = require('discord.js');
const Discord = require("discord.js")
const client = require("../newindex.js")
let card = require("./readcard.js")
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output
var pushButton = new Gpio(17, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled
let isAuth = ""
module.exports = {
	data: new SlashCommandBuilder()
		.setName('alarm')
		.setDescription('change alarm state')
		.addStringOption(option =>
			option.setName('options')
				.setDescription('change it to enable/disable the alarm')
				.addChoices(
					{ name: 'On', value: "true" },
					{ name: 'Off', value: "false" },
				)),
	async execute(interaction) {
		const input = interaction.options.getString('options')
		interaction.reply("State of door alarm is set to " + input)
		if (input === 'true') {
			pushButton.watch(function (err, value) {
				if (err) { //if an error
					console.error('There was an error', err);
					return;
				}
				let str = ""

				if (value === 1) { str = "high" } else { str = "low" }
				if (card.auth === "false") {
					interaction.followUp('intruders has moved the door at ' + Date().toString())

				}

				LED.writeSync(value);
			});
		}

		else if (input === 'false') {
			unexportOnClose()
		}

	}
}

function unexportOnClose() { //function to run when exiting program
	LED.writeSync(0); // Turn LED off
	LED.unexport(); // Unexport LED GPIO to free resources
	pushButton.unexport(); // Unexport Button GPIO to free resources
};


