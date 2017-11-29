/**
 * Created by sargis.isoyan on 21/11/2017.
 */
const faker = require('faker'),
    request = require('request');

class FakeDataRequest {
    constructor() {

    }

    static GENERATE_DATA() {
        return {
            name: faker.name.findName(),
            randomEmail: faker.internet.email(),
            message: faker.lorem.sentence(),
            date: faker.date.future()
        }
    }

    static SEND_REQUEST() {
        let data = this.GENERATE_DATA();
        let headers = {
            "content-type": "application/json",
        };
        request({
                method: 'post',
                url: 'http://localhost:3000/data',
                form: data,
                headers: headers,
                json: true,
            }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body)
                }
            }
        );
    }
}
setInterval(()=>FakeDataRequest.SEND_REQUEST(),100);