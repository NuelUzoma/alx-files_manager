const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;
    this.client = new MongoClient(url, { monitorCommands: true });
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('Connected to MongoDB Server');
    } catch (error) {
      console.error('Connection to MongoDB Server failed:', error);
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
    }
  }

  async nbFiles() {
    try {
      const db = this.client.db();
      const filesCollection = db.collection('files');
      const filesCount = await filesCollection.countDocuments();
      return filesCount;
    } catch (error) {
      console.error('Error counting files:', error);
    }
  }
}

const dbClient = new DBClient();
dbClient.connect(); // Connect to MongoDB when the module is imported

module.exports = dbClient;
