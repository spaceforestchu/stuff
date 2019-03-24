const ZipCode = require("../model/ZipCode");

module.exports = {

  getAllZipCodes: (params) => {

    return new Promise((resolve, reject) => {

      ZipCode.find(params)
        .then(results => {
          resolve(results);
        })
        .catch(error => {
          reject(error);
        })

    });

  }

}