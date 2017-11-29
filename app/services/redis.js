/**
 * Created by sargis.isoyan on 22/11/2017.
 */
const config = require('./../config'),
    redis = require("redis"),
    client = redis.createClient(config.redis);

class RedisService {
    constructor(store) {
        this.store = (store && typeof store == "string") ? store : 'data';
    }

    setObject(key, obj) {
        return new Promise((resolve, reject) => {
            client.hmset(this.store, key, JSON.stringify(obj), (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(key);
            });
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            client.hgetall(this.store, function (err, result) {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    deleteByKeys(keys) {
        return new Promise((resolve, reject) => {
            client.hdel(this.store, keys, function (err, res) {
                if (err) {
                    return reject(err);
                }
                resolve(res);
            });
        });
    }


}

module.exports = RedisService;