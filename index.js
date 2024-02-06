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
TextOnGif.registerFont({path:"./roboto.ttf", family:"roboto"});

const filePath = "./gmtown/gmtown.gif";
var babyMode = false;

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
  if(/^gmtron/.test(message.content)) gifgifgif("gm town", message, message.content.replace(/^gmtron\s/, ""));
  if(/^gntron/.test(message.content)) gifgifgif("gn town", message, message.content.replace(/^gntron\s/, ""));
  if(/^gmtrom/.test(message.content)) message.channel.send("https://tenor.com/view/minor-spelling-mistake-minor-spelling-mistake-i-win-minor-spelling-mistake-i-win-meme-shadow-the-hedgehog-shadow-gif-26138585");
});


const gifgifgif = (caption,message, option) => {
    option = option === "" ? Math.floor(Math.random()*1000000) + "" : option;
    if(/babymode/.test(option)) {
        babyMode = !babyMode;
    }
    console.log(message.author.globalName + "(" + message.author.username + "): " + option);
    try {
        Tenor.Search.Random(option, "1").then( async (Results) => {
            const url = babyMode ? Results[0].media_formats.tinygif.url : Results[0].media_formats.gif.url;
            await gmtown(caption,url);
            message.channel.send({ files: [{ attachment: filePath}] });
        }).catch(console.error);
    } catch (error) {
        message.channel.send("https://tenor.com/view/gif-not-found-spinning-no-gif-gif-17612019");
    }
    
}

const gmtown = async (caption,url) => {
    var gif = new TextOnGif({
        file_path: url,
        font_style: "roboto",
        font_color: "white",
        stroke_color: "white",
        font_size: babyMode ? "20px" : "50px",
        stroke_width: 1
    });

    await gif.textOnGif({
        text: caption,
        get_as_buffer: true, //set to false to save time
        write_path: filePath
    });
}

client.login(process.env.tokenizeDeezNuts);