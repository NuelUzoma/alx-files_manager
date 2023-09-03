const { MongoClient } = require('mongodb');

class DBCLient {
    constructor() {
        const host = 'localhost';
        const port = 27017;
        const database = 'files_manager';
        const url = `mongodb://${host}:${port}/${database}`;
        this.client = new MongoClient(url, { monitorCommands: true });
    }

    async connect() {
        try {
            await this.client.connect();
            console.log('Connected to MongoDB Server');
        } catch (error) {
            console.error('Connection to MongoDB Server failed:', error)
        }
    }

    isAlive() {
        if (this.client.isConnected) {
            return true;
        } else {
            return false;
        }
    }

    async nbUsers() {
        try {
            const db = this.client.db();
            const usersCollection = db.collection('users');
            const usersCount = await usersCollection.countDocuments();
            return usersCount;
        } catch (error) {
            console.error('Error counting users:', error);
            return 0;
        }
    }

    async nbFiles() {
        try {
            const dbs = this.client.db();
            const filesCollection = dbs.collection('files');
            const filesCount = await filesCollection.countDocuments();
            return filesCount;
        } catch (error) {
            console.error('Error counting files:', error);
            return 0;
        }
    }
}

const dbClient = new DBCLient();

module.exports = dbClient;
