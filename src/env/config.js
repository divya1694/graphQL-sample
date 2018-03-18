import * as dev from './dev';
import * as prod from './prod';

let envConf = () => {
    console.log('env runnig', process.env.NODE_ENV);
    switch (process.env.NODE_ENV) {
        case 'dev':
            return dev;
        case 'production':
            return prod;

        default:
            return {};
    }
};
module.exports = {conf: new envConf()};
