//http://mochajs.org/#getting-started
var app = require('../app.js').app;
console.log("app", app);
var request = require('supertest')
var assert = require('assert');

//Sample mocha test
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

describe('Express app', function(){
  it('should inherit from event emitter', function(done){
    app.on('foo', done);
    app.emit('foo');
  })

  it('should be callable', function(){
    assert.equal(typeof app, 'function');
  })

  it('should 404 without routes', function(done){
    request(app).get('/foo').expect(404, done);
  })

  it('should ping', function(done){
    request(app).get('/ping')
      .expect('Content-Type', /json/)
      .expect({"response":"pong"}, done);
  })
})
