#! /usr/local/bin/python3

from enum import Enum, auto


class CurrencyType(Enum):
    COPPER = auto()
    SILVER = auto()
    ELECTRUM = auto()
    GOLD = auto()
    PLATINUM = auto()


CONVERSION = {
    CurrencyType.COPPER: {
        CurrencyType.PLATINUM: 1000,
        CurrencyType.GOLD: 100,
        CurrencyType.ELECTRUM: 50,
        CurrencyType.SILVER: 10,
    },
    CurrencyType.SILVER: {
        CurrencyType.PLATINUM: 100,
        CurrencyType.GOLD: 10,
        CurrencyType.ELECTRUM: 5,
    },
    CurrencyType.ELECTRUM: {
        CurrencyType.PLATINUM: 20,
        CurrencyType.GOLD: 2,
    },
    CurrencyType.GOLD: {
        CurrencyType.PLATINUM: 10,
    },
}


class Currency:

    inventory = {}

    def __init__(self, inventory):
        self.inventory = inventory

    def __str__(self):
        return "\n".join([("%s: %s" % (kvp.name, self.inventory[kvp])) for kvp in self.inventory])

    def reduce(self):
        for from_currency in CONVERSION:
            if from_currency not in self.inventory:
                continue
            for to_currency in CONVERSION[from_currency]:
                conversion_rate = CONVERSION[from_currency][to_currency]
                quotient = self.inventory[from_currency] // conversion_rate
                remainder = self.inventory[from_currency] - \
                    (quotient * conversion_rate)
                if to_currency not in self.inventory:
                    self.inventory[to_currency] = 0
                self.inventory[to_currency] += quotient
                self.inventory[from_currency] = remainder
                


currency = Currency({CurrencyType.COPPER: 0, CurrencyType.SILVER: 67, CurrencyType.ELECTRUM: 0, CurrencyType.GOLD: 1933, CurrencyType.PLATINUM: 903})
currency.reduce()

print(currency)
