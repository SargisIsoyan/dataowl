/**
 * Created by sargis.isoyan on 22/11/2017.
 */
const RedisService = require('./../services/redis'),
    models = require('./../models'),
    cron = require('node-cron');

const redisService = new RedisService("data");

class MigrateService {
    constructor() {

    }

    static moveDataFromRedis(callback) {
        let data = [], keys = [], t;
        redisService.getAll().then((result) => {
            for (let key in  result) {
                let parsedInfo = JSON.parse(result[key]);
                data.push = {
                    name: parsedInfo.name,
                    email: parsedInfo.randomEmail,
                    date: parsedInfo.date,
                    text: parsedInfo.message,

                };
                keys.push(key);
            }
        }).then(() => {
            return models.sequelize.transaction({autocommit: false})
        }).then((transaction) => {
            t = transaction;
            return models.messages.bulkCreate(data, {transaction: transaction});
        }).then(() => {
            return redisService.deleteByKeys(keys);
        }).then((res) => {
            console.log(res);
            return t.commit();
        }).then(() => {
            callback();
        }).catch(function (err) {
            callback(err);
            return t.rollback();
        });
    }
}

cron.schedule("* * * * *", () => {
    MigrateService.moveDataFromRedis(function (err) {
        if (err) {
            throw new Error(err);
        }
    });
});
