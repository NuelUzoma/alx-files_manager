const MongoClient = require('mongodb');

class DBCLient {
    constructor() {
        this.host = 'localhost';
        this.port = 27017;
        this.database = 'files_manager';
        this.url = `mongobg://${this.host}:${this.port}`;
        this.client = new MongoClient(this.url, { useUnifiedTopology: true });
    }

    async connect() {
        try {
            await this.client.connect();
            console.log('Connected to MongoDB Server');
        } catch(error) {
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
        } catch(error) {
            console.error('Error counting users:', error);
        }
    }

    async nbFiles() {
        try {
            const dbs = this.client.db();
            const filesCollection = dbs.collection('files');
            const filesCount = filesCollection.countDocuments();
            return filesCount;
        } catch(error) {
            console.error('Error counting files:', error);
        }
    }
}

const dbClient = new DBCLient();

module.exports = dbClient;
