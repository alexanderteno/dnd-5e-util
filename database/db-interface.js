const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

class ApplicationDatabase {

    constructor(db) {
        db.defaults({ items: [], itemsCount: 0 })
            .write();
        this.db = db;
    }

    itemExists(itemName) {
        const item = this.db.get('items')
            .find({ name: itemName })
            .value();
        return !!item;
    }

    registerItem(item) {
        this.db.update('itemsCount', itemsCount => itemsCount + 1)
            .write();
        const itemId = this.db.get('itemsCount').value();
        console.log(itemId);
        this.db.get('items')
            .push({ id: itemId, name: item.name, value: item.value })
            .write();
    }

}

const applicationDatabase = new ApplicationDatabase(db);

module.exports = {
    applicationDatabase: applicationDatabase,
}