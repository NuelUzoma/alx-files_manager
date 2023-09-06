import { MongoClient, ObjectId } from 'mongodb';

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const database = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${host}:${port}`;

class DBCLient {
    constructor() {
        this.client = new MongoClient(url);
        this.client.connect().then(() => {
            this.isalive = true;
            this.db = this.client.db(database);
        }).catch((err) => {
            console.log(err);
        });
    }

    isAlive() {
        if (this.isalive) return true;
        return false;
    }

    async nbUsers() {
        const usersCollection = this/db.collection('users');
        const usersCount = await usersCollection.estimatedDocumentCount();
        return usersCount;
    }

    async nbFiles() {
        const filesCollection = this.db.collection('files');
        const filesCount = await filesCollection.estimatedDocumentCount();
        return filesCount;
    }

    async findUser(queryKey, queryVal) {
        const query = {};
        if (queryKey === '_id') {
          query[queryKey] = ObjectId(queryVal);
        } else {
          query[queryKey] = queryVal;
        }
        const users = this.db.collection('users');
        const user = await users.findOne(query, {});
        if (user) return user;
        return false;
    }
    
      async addUser(userData) {
        const users = this.db.collection('users');
        const result = await users.insertOne(userData);
        return result;
    }
}

export const dbClient = new DBCLient();
export default dbClient;
