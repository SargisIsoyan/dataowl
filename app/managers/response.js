/**
 * Created by sargis.isoyan on 21/11/2017.
 */

const ResponseBase = {
    "success": false,
    "message": "",
    "data": {}
};

class ResponseManager {
    constructor() {

    }

    static getResponseHandler(res) {
        return {
            onSuccess: function (data, message, code) {
                ResponseManager.respondWithSuccess(res, code || 200, data, message);
            },
            onError: function (error) {
                ResponseManager.respondWithError(res, error.status || 500, error.message || 'Unknown error');
            }
        };
    }

    static respondWithSuccess(res, code, data, message = "") {
        let response = Object.assign({}, ResponseBase);
        response.success = true;
        response.message = message;
        response.data = data;
        res.status(code).json(response);
    }

    static respondWithError(res, errorCode, message = "") {
        let response = Object.assign({}, ResponseBase);
        response.success = false;
        response.message = message;
        res.status(errorCode).json(response);
    }
}

module.exports = ResponseManager;