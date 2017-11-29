/**
 * Created by sargis.isoyan on 21/11/2017.
 */
const AutoBind = require('auto-bind');

class AutoBindClass {
    constructor(){
        AutoBind(this);
    }
}

module.exports = AutoBindClass;