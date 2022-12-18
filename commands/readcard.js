const { SlashCommandBuilder } = require('discord.js');
const Discord = require("discord.js")
const client = require("../newindex.js") 
let alarm = require("./alarm.js")
const Mfrc522 = require("../node_modules/rc522-rpi/index");
const SoftSPI = require("rpi-softspi");
const softSPI = new SoftSPI({
  clock: 23, // pin number of SCLK
  mosi: 19, // pin number of MOSI
  miso: 21, // pin number of MISO
  client: 24 // pin number of CS
});
const mfrc522 = new Mfrc522(softSPI).setResetPin(22).setBuzzerPin(18);

module.exports = {
data : new SlashCommandBuilder()
        .setName('readcard')
        .setDescription('reads card from sensor')
        ,
        async execute(interaction){
		
		interaction.reply("put your card on the sensor.")
		module.exports.readCard(interaction)	
			
	},
auth : "false"

}
module.exports.readCard = function(interaction){
let intervalId = setInterval(function() {
  //# reset card
  mfrc522.reset();

  //# Scan for cards
  let response = mfrc522.findCard();
  if (!response.status) {
    console.log("No Card");
    return;
  }
  console.log("Card detected, CardType: " + response.bitSize);

  //# Get the UID of the card
  response = mfrc522.getUid();
  if (!response.status) {
    console.log("UID Scan Error");
    return;
  }
  //# If we have the UID, continue
  const uid = response.data;
  console.log(
    "Card read UID: %s %s %s %s",
    uid[0].toString(16),
    uid[1].toString(16),
    uid[2].toString(16),
    uid[3].toString(16)
  );

  //# Select the scanned card
  const memoryCapacity = mfrc522.selectCard(uid);
  console.log("Card Memory Capacity: " + memoryCapacity);

  //# This is the default key for authentication
  const key = [0xff, 0xff, 0xff, 0xff, 0xff, 0xff];

  //# Authenticate on Block 8 with key and uid
  if (!mfrc522.authenticate(8, key, uid)) {
    console.log("Authentication Error");
    return;
  }
	let str = ""
  //# Dump Block 8
  for( var i = 8; i <= 8; i++){
  	console.log("Block: " + i +  " Data: " + mfrc522.getDataForBlock(i));
	  str += mfrc522.getDataForBlock(i)

  }
	console.log(str)
	if(str === "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16"){
		if(interaction){
		interaction.editReply('Auth successful')
		}
		module.exports.auth =  "true"
	}else{
		if(interaction){
		interaction.editReply('Auth fail')
		}		
		module.exports.auth = "false"
	}

  //# Stop
  mfrc522.stopCrypto();
	clearInterval(intervalId)
}, 500);
	
}


