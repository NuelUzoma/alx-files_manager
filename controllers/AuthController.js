import sha1 from 'sha1';
import uuidv4 from 'uuidv4';
import dbClient from '../utils/db.js';
import redisClient from '../utils/redis.js';

class AuthController {
    static async getConnect(req, res) {
        const authData = req.header('Authorization');
        let usrEmail = authData.split(' ')[1];
        const buffer = Buffer.from(usrEmail, 'base64');
        usrEmail = buffer.toString('ascii');
        const data = usrEmail.split(':');
        if (data !== 2) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const hashedPassword = sha1(data[1]);
        const numUsers = dbClient.db.collection('users');
        numUsers.findOne({ email: data[1], password: hashedPassword }, async(err, user) => {
            if (user) {
                const token = uuidv4();
                const key = `auth_${token}`;
                await redisClient.set(key, user._id.toString(), 60 * 60 * 24);
                res.status(200).json({ token });
            } else {
                res.status(401).json({ error: 'Unauthorized' });
            }
        });
    }

    static async getDisconnect(req, res) {
        const authToken = req.header('X-Token');
        const authKey = `auth_${authToken}`;
        const authId = await redisClient.get(authKey);
        if (authId) {
            await redisClient.del(authKey);
            res.status(204).json({});
        } else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    }
}

export default AuthController;
