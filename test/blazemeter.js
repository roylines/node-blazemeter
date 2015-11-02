var Blazemeter = require('../lib/blazemeter');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var should = require('chai').should();

lab.experiment('blazemeter', function() {
  var blaze = new Blazemeter(process.env.BLAZEMETER_API_KEY);

  lab.test('can create a client', function(done) {
    should.exist(blaze);
    return done();
  });

  lab.test('should return tests', function(done) {
    blaze.tests(function(e, tests) {
      should.not.exist(e);
      tests.should.be.an('array');
      return done(e);
    });
  });
});
