//'use strict';

const axios = require('axios')
const querystring = require('querystring');


const index = axios.create({
    baseURL: 'https://index.commoncrawl.org/',
    timeout: 10000
});



var commoncrawl = {

    getIndex() {

        return new Promise((resolve, reject) => {

            index.get('collinfo.json').then(function (res) {
                resolve(res.data)
            }).catch(function (error) {
                reject(error)
            })
        })
    },

    searchURL(url, options = {}) {

        let indexid = options.index || 'CC-MAIN-2019-30-index'

        let parmas = {

            url: url,
            from: options.from,
            to: options.to,
            matchType: options.matchType || 'domain', // exact, prefix, host , domain,
            limit: options.limit,
            sort: options.sort,
            page: options.page,
            pageSize: options.pageSize,
            showNumPages: options.showNumPages || false,
            output: 'json'
        }

        console.log(parmas)

        return new Promise((resolve, reject) => {

            index.get(indexid, {
                params: parmas
            }).then(function (res) {

                if (options.showNumPages){

                    resolve(res.data);
                    return
                }

                let items = []
                let stringArray = res.data.split('\n')

                stringArray.map(function (item) {
                    try {
                        let itemjson = JSON.parse(item)
                        items.push(itemjson)

                    } catch (e) {
                        //console.log(e)
                    }
                })

                resolve(items)

            }).catch(function (error) {
                reject(error)

            })
        })


    }


};

module.exports = commoncrawl;

// Allow use of default import syntax in TypeScript
module.exports.default = commoncrawl;
