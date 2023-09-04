import { MongoClient } from 'mongodb';

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const database = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${host}:${port}`;

class DBCLient {
    constructor() {
        this.client = new MongoClient(url, {
            monitorCommands: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        this.client.connect().then(() => {
            this.db = this.client.db(`${database}`);
        }).catch((err) => {
            console.log(err);
        });
    }

    isAlive() {
        if (this.client.isConnected) {
            return true;
        } else {
            return false;
        }
    }

    async nbUsers() {
        const db = this.client.db();
        const usersCollection = db.collection('users');
        const usersCount = await usersCollection.countDocuments();
        return usersCount;
    }

    async nbFiles() {
        const db = this.client.db();
        const filesCollection = db.collection('files');
        const filesCount = await filesCollection.countDocuments();
        return filesCount;
    }
}

const dbClient = new DBCLient();

export default dbClient;
