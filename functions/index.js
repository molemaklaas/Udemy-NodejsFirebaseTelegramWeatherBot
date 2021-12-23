/* eslint-disable max-len */
const functions = require("firebase-functions");
const {Telegraf} = require("telegraf");

let config = require("./../env.json");

if (Object.keys(functions.config()).length) {
  config = functions.config();
}

// const bot = new Telegraf("0000000000:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
const bot = new Telegraf(config.service.telegram.keys);
bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on("sticker", (ctx) => ctx.reply("👍")); // you must send a sticker not an emojii
bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.command("oldschool", (ctx) => ctx.reply("Hello"));
bot.command("hipster", Telegraf.reply("λ"));
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

exports.helloWorld = functions.https.onRequest((request, response) => {
  const axios = require("axios");
  const params = {
    // access_key: "xxxxxxxxxxxxxxxxxxxxxxxx",
    access_key: config.service.weatherstack.keys,
    query: "New York",
  };
  // functions.logger.info("Hello logs!", {structuredData: true});
  // response.send("Hello from Firebase!");

  // Can't use https on the free account
  axios.get("http://api.weatherstack.com/current", {params})
      .then((responsed) => {
        const apiResponse = responsed.data;
        // console.log(`Current temperature in ${apiResponse.location} is ${apiResponse.current.temperature}℃`);
        return response.send(apiResponse);
      }).catch((error) => {
        console.log(error);
      });
});
