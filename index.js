const Discord = require('discord.js');
const auth = require('./auth.json');
const CurrencyExchange = require('./utilities/currency-exchange');
const DbInterface = require('./database/db-interface');

const client = new Discord.Client();
const { applicationDatabase } = DbInterface

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
                message.reply();
                break;
            case "register-item":
                [name, value] = args;
                if (!applicationDatabase.itemExists(name)) {
                    console.log(`Item '${name}' not Found`)
                    const items = applicationDatabase.registerItem({ name, value });
                }
                break;
        }
    }
});

client.login(auth.token);