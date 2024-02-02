require("dotenv").config();
const { Client, GatewayIntentBits, } = require("discord.js");
const Tenor = require("tenorjs").client({
    "Key": process.env.tenorKey,
    "Filter": "medium", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
    "MediaFilter": "minimal", // either minimal or basic, not case sensitive
    "DateFormat": "D/MM/YYYY - H:mm:ss A" // Change this accordingly
});
const TextOnGif = require('text-on-gif');

const filePath = "./gmtown/gmtown.gif";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

client.once("ready", () => {
  console.log("Bot Ready...");
});

client.on("messageCreate", message => {
  if(/^gmtron/.test(message.content)) gifgifgif("gm town", message, message.content.replace(/^gmtron/, ""));
  if(/^gntron/.test(message.content)) gifgifgif("gn town", message, message.content.replace(/^gntron/, ""));
});


const gifgifgif = (caption,message, option) => {
    option = option === "" ? Math.floor(Math.random()*1000000) + "" : option;
    console.log(option);
    Tenor.Search.Random(option, "1").then( async (Results) => {
        await gmtown(caption,Results[0].media_formats.gif.url);
        message.channel.send({ files: [{ attachment: filePath}] });
    }).catch(console.error);
}

const gmtown = async (caption,url) => {
    var gif = new TextOnGif({
        file_path: url,
        font_color: "white",
        font_size: "50px"
    });

    await gif.textOnGif({
        text: caption,
        get_as_buffer: true, //set to false to save time
        write_path: filePath
    });
}

client.login(process.env.tokenizeDeezNuts);