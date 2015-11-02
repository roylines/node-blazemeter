var request = require('request');

module.exports = Blazemeter;

function Blazemeter(key) {
  this._key = key;
}

Blazemeter.prototype.tests = {};

Blazemeter.prototype.tests.add = function(config, done) {
  return post(done);
}

function post(done) {
  return request.post({
    headers: {
      "x-api-key": this._key
    }
  }, done);
}
