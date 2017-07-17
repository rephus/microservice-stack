//http://mochajs.org/#getting-started
var app = require('../app.js').app;
console.log("app", app);
var appRequest = require('supertest');
var request = require('superagent').agent();
var assert = require('assert');


require('../consumer.js');

describe('Integration test with user', function(){

  it('should 404 without routes on user', function(done){
    request.get('http://user/foo').end(function(err, res){
      assert.equal(err.status, 404);
      done()
    })
  })

  it('should ping to user', function(done){

     request.get('http://user/ping').end(function(err, res){
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.response,  'pong');
          done();
      });
  })

  it('creating user should send me back a rabbitmq message', function(done){

    var startRequest = (new Date()).getTime();
     request.get('http://user/user').end(function(err, res){
          //TODO Check that slack message was sent by looking at redis
          //done();
          appRequest(app).get('/messages')
            .expect('Content-Type', /json/)
            .end(function(err, res) {
              if (err) throw err;
              //TODO improve json response
              var msg = res.body[0];
              timestamp = msg.split(' ')[1];
              assert.equal(msg.split(' ')[0], 'sent');
              //https://nodejs.org/api/assert.html
              done();
              //TODO fix this assertion
              //assert(parseInt(timestamp) >= parseInt(startRequest),
              //  "Expected msg '"+msg+"'to happen after beggining of the test: "+ startRequest);
            });
  //.expect({"response":"pong"}, done);


      });

  })
})
