/**
 * Created by sargis.isoyan on 21/11/2017.
 */
const AutoBindClass = require('./base/autobind'),
    RedisService = require('./../services/redis');

const redisService = new RedisService("data");
class DataController extends AutoBindClass {
    constructor() {
        super();
    }

    create(req, callback) {
        let data = req.body,
            timestamp = Date.now();
        redisService.setObject(timestamp, data)
            .then((key) => {
                callback.onSuccess({key: key});
            }).catch(callback.onError);

    }
}

module.exports = DataController;