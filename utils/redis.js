const redis = require('redis');

class RedisClient {
    constructor() {
        this.client = redis.createClient();
        this.client.on('error', (error) => {
            console.log(`Connection to Redis client failed: ${error}`);
        })
    }

    isAlive() {
        if (this.client.connected) {
            return true;
        } else {
            return false;
        }
    }

    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (error, value)  => {
                if (error) {
                    reject(error);
                } else {
                    resolve(value);
                }
            });
        });
    }

    async set(key, value, duration) {
        return new Promise((resolve, reject) => {
            this.client.set(key, value, 'EX', duration, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    async del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (error, value) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(value);
                }
            });
        });
    }
}

const redisClient = new RedisClient();

module.exports = redisClient;
