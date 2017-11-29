/**
 * Created by sargis.isoyan on 21/11/2017.
 */
module.exports = (app) => {
    app.use('/data', require('./routes/data'));
};
