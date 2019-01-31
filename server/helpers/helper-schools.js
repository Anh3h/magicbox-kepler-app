const fs = require('fs');
let config = require('../azure/config');
let has_cred = config.azure.schools.key1.match(/\d/);
const blobFetcher = require('../azure/blob-fetcher');

module.exports = {
    sendCountrySchoolData: countryCode => {
        return new Promise((resolve, reject) => {
            let file = `${countryCode}.csv`;
            if (has_cred) {
                blobFetcher.fetchBlob('schools', file)
                    .then(schoolData => {
                        return resolve(schoolData);
                    });
            } else {
                let path = `./public/schools/${file}`;
                fs.readFile(path, {encoding: 'utf8'}, (err, file) => {
                    resolve(file)
                })
            }
        })
    }
}