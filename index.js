const TelegramBot = require("node-telegram-bot-api");
const dialogFlow = require("./dialogflow");
const youtube = require('./youtube');

const token = '2107101662:AAEjMPfw1hMOIRlfFr7vdlPpG2ZcLA0SHxk';

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    console.log(msg.text);

    const dfResponse = await dialogFlow.sendMessage(chatId.toString(), msg.text);

    let responseText = dfResponse.text;
    console.log(dfResponse);
    if (dfResponse.intent == 'Treino Específico') {
        console.log('isso');
        responseText = await youtube.searchVideoURL(responseText, dfResponse.fields.corpo.stringValue);
    }
    bot.sendMessage(chatId, responseText);
})