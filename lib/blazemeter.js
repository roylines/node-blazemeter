var request = require('request');

module.exports = Blazemeter;

function Blazemeter(key) {
  this.get = get(key);
  this.projects = {
    all: get(key, '/projects')
  };
  this.tests = {
    all: get(key, '/tests')
  };
}

function options(key, path) {
  return {
    url: 'https://a.blazemeter.com:443/api/latest' + path,
    headers: {
      'x-api-key': key
    },
    json: true
  };
}

function get(key, path) {
  return function(done) {
    return request.get(options(key, path), function(e, r, b) {
      if (r.statusCode != 200) {
        var error = new Error('Failed call');
        error.statusCode = r.statusCode;
        return done(error);
      }
      
      return done(null, b.result);
    });
  }
}
