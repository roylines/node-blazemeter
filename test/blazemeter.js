var Blazemeter = require('../lib/blazemeter');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var request = require('request');
var should = require('chai').should();
var sinon = require('sinon');

lab.experiment('blazemeter', function() {
  var blaze;

  lab.beforeEach(function(done) {
    blaze = new Blazemeter('APIKEY');
    sinon.stub(request, 'get');
    sinon.stub(request, 'post');
    return done();
  });

  lab.afterEach(function(done) {
    request.get.restore();
    request.post.restore();
    return done();
  });

  lab.test('can create a client', function(done) {
    should.exist(blaze);
    return done();
  });

  lab.test('can add test', function(done) {
    request.post.yields();
    return blaze.tests.add('CONFIG', function(e, tests) {
      should.not.exist(e);
      assertToken(request.post);
      return done(e);
    });
  });

  function assertToken(method) {
    var options = method.args[0][0];
    options.headers['x-api-key'] = 'APIKEY';
  }
});
