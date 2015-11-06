var _ = require('lodash');
var Blazemeter = require('../lib/blazemeter');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var should = require('chai').should();

lab.experiment('blazemeter', function() {
  var blaze;

  lab.beforeEach(function(done) {
    blaze = new Blazemeter(process.env.BLAZEMETER_API_KEY);
    return done();
  });

  lab.test('can create a client', function(done) {
    should.exist(blaze);
    return done();
  });
  
  lab.test('returns error if key invalid', function(done) {
    var blaze2 = new Blazemeter('Invalid');
    return blaze2.projects.all(function(e) {
      should.exist(e);
      return done();
    });
  });

  lab.test('can get all projects', function(done) {
    return blaze.projects.all(function(e, projects) {
      should.not.exist(e);
      projects.should.not.be.empty;
      _.find(projects, { name: 'blaze-test-project' }).should.have.property('id');
      return done(e);
    });
  });
  
  lab.test('can get all tests', function(done) {
    return blaze.tests.all(function(e, projects) {
      should.not.exist(e);
      projects.should.not.be.empty;
      _.find(projects, { name: 'blaze-test-test' }).should.have.property('id');
      return done(e);
    });
  });
});
