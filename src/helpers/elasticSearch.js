let fetch = require('node-fetch');
import {conf} from "../env/config";

module.exports.getLatestByUserId = (request,url) => {
    console.log('request', request)
    console.log('url*******************',url)
    return fetch(conf.ELASTICSEARCH_URL +url+'/items/_search', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic dXNlcjp1b1pEdkE0UkxtQXA='
        }
    })
        .then((res) => {
            return res.json();
        }).then(response => {

            console.log('response:',response);
            return response;
        });
};

