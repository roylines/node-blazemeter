module.exports = Blazemeter;

function Blazemeter(token) {
  this._token = token;
}

Blazemeter.prototype.tests = function(done) {
  return done(null, []);
}
