const CONVERSION = {
    "copper": {
        "platinum": 1000,
        "gold": 100,
        "electrum": 50,
        "silver": 10,
    },
    "silver": {
        "platinum": 100,
        "gold": 10,
        "electrum": 5,
    },
    "electrum": {
        "platinum": 20,
        "gold": 2,
    },
    "gold": {
        "platinum": 10,
    },
}

const CURRENCY_NAMES = {
    "cp": "copper",
    "sp": "silver",
    "ep": "electrum",
    "gp": "gold",
    "pp": "platinum",
    "copper": "copper",
    "silver": "silver",
    "electrum": "electrum",
    "gold": "gold",
    "platinum": "platinum",
};

const ARG_PATTERN = /(\d+[a-z]+)/g

class CurrencyConverter {

    constructor(args) {
        const inventory = {};
        const currencyDetails = args.join('').match(ARG_PATTERN);
        currencyDetails.forEach((currencyDetail) => {
            const currencyLongName = CURRENCY_NAMES[Object.keys(CURRENCY_NAMES).find((currencyName) => currencyDetail.includes(currencyName))];
            const value = parseInt(currencyDetail.match(/(\d+)/));
            if (inventory[currencyLongName]) {
                throw Error(`Currency '${currencyLongName}' was provided twice`);
            }
            inventory[currencyLongName] = value;
        })
        this.inventory = inventory;
    }

    optimize() {
        Object.keys(CONVERSION).forEach((fromCurrency) => {
            if (this.inventory[fromCurrency] === undefined) {
                return;
            }
            Object.keys(CONVERSION[fromCurrency]).forEach((toCurrency) => {
                const conversionRate = CONVERSION[fromCurrency][toCurrency];
                const quotient = Math.floor(this.inventory[fromCurrency] / conversionRate);
                const remainder = this.inventory[fromCurrency] - (quotient * conversionRate);
                if (this.inventory[toCurrency] === undefined) {
                    this.inventory[toCurrency] = 0;
                }
                this.inventory[toCurrency] += quotient;
                this.inventory[fromCurrency] = remainder;
            });
        });
    }

    getConversion() {
        return this.inventory;
    }

}

module.exports = {
    CurrencyConverter: CurrencyConverter,
};