const fs = require("fs");
const path = require("path");
const randomId = require("random-id");

const dbFile = path.join(__dirname, "db.json");
const DATA = JSON.parse(fs.readFileSync(dbFile, "utf-8"));

const NO_COLLECTION = "NO_COLLECTION";
const NO_ENTITY = "NO_ENTITY"

const sync = () => {
    fs.writeFileSync(dbFile, JSON.stringify(DATA), "utf-8")
}

const noCollectionError = () => {
    const err = new Error("Collection does not exist")
    err.code = NO_COLLECTION
    return err
}

const noEntityError = () => {
    const err = new Error("Entity does not exist")
    err.code = NO_ENTITY
    return err
}

const db = {
    find: async (collection, filter) => {
        if (!DATA[collection]) {
            throw noCollectionError()
        }
        const data = DATA[collection]
        if (filter) {

            // return data.filter(o => o._id === filter).length
            return data.filter((o) => (Object.keys(filter).every((k) => (o[k] === filter[k]))))
        }
        return data;
    },
    get: async (collection, id) => {
        if (!DATA[collection]) {
            throw noCollectionError()
        }
        const data = DATA[collection]
        const o = data.find((o) => o._id === id)
        console.log(data)

        console.log(o)
        if (!o) {
            throw noEntityError()
        }
        return o
    },
    create: async (collection, data) => {
        if (!DATA[collection]) {
            throw noCollectionError()
        }
        const id = randomId()
        DATA[collection].push({
            ...data,
            _id: id,
        })
        sync()
        return id
    },
    update: async (collection, id, data) => {
        const o = await db.get(collection, id)
        Object.assign(o, data)
        sync()
    },
    delete: async (collection, id) => {
        if (!DATA[collection]) {
            throw noCollectionError()

        }
        if (!DATA[collection].filter(o => o._id === id).length) {
            throw noCollectionError()

        }
        DATA[collection] = DATA[collection].filter((o) => o._id !== id)
        sync()

    },
    collections: async () => {
        return Object.keys(DATA)
    },
    createCollection: async (collection) => {
        DATA[collection] = DATA[collection] || []
        sync()
    },
    reset: async () => {
        DATA = {}
        sync()
    },
    NO_COLLECTION,
    NO_ENTITY
}

module.exports = db
