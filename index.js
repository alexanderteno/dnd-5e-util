const Discord = require('discord.js');
const auth = require('./auth.json');
const CurrencyExchange = require('./utilities/currency-exchange');

console.log(CurrencyExchange);

const client = new Discord.Client();

client.on('ready', () => {
    console.info(`Logged in as ${client.user.tag}`);
});

client.on('message', message => {
    const { content } = message;
    if (content.substring(0, 1) == '!') {
        const [command, ...args] = content.toLowerCase().substring(1).split(' ');
        switch (command) {
            case "optimize":
                const currencyConverter = new CurrencyExchange.CurrencyConverter(args);
                currencyConverter.optimize();
                message.reply(currencyConverter.getInventory());
                break;
        }
    }
});

client.login(auth.token);