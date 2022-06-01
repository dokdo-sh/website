const request = require("request");
const Big = require('big.js');

var solarcraftApi = /** @class */ (function() {

    function solarcraftApi(apiURL) {
        if (apiURL === void 0)
            this.apiURL = 'https://stats.mainnet.sh';
        else
            this.apiURL = apiURL;

        return this;
    }


    solarcraftApi.prototype.getStats = function() {

        return new Promise((resolve, reject) => {

            request.get(this.apiURL + '/stats', { json: true }, function(error, data, body) {

                if (error) {
                	console.log(error);
                    reject(error);
                    return;
                }
                resolve(body);

            });

        });

    }

    return solarcraftApi;

}());

exports.default = solarcraftApi;