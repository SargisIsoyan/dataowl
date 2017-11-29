/**
 * Created by sargis.isoyan on 21/11/2017.
 */
const router = require('express').Router(),
    responseManager = require('../managers/response');


const DataController = require('./../conrollers/data');
let dataController = new DataController();

router.post('/', (req, res) => {
    dataController.create(req,responseManager.getResponseHandler(res));
});

module.exports = router;