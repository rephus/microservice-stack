//http://mochajs.org/#getting-started
var app = require('../app.js').app;
console.log("app", app);
var appRequest = require('supertest');
var request = require('superagent').agent();
var assert = require('assert');

describe('Healthcheck', function(){
  it('check health on all services', function(done){

     request.get('http://localhost/health').end(function(err, res){
       
       services = ['user', 'slack']

       assert.equal(Object.keys(res.body).length, services.length);
       services.forEach(function(service){
         assert.equal(res.body[service].error, undefined); 
        assert.equal(res.body[service].response,  'pong');
       });
       done();
            
      });

  })
  
})
describe('Integration test with user', function(){

  it('should ping', function(done){

     request.get('http://user/ping').end(function(err, res){
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.response,  'pong');
          done();
      });
  })


  it('creating user should return expected response', function(done){

     request.post('http://localhost/user') 
      .set('Accept', 'application/json')
      .send({ 'foo': 'bar' })
      .end(function(err, res){
          //TODO Check that slack message was sent by looking at redis
          //done();
          console.log(res.body);
         done();
  //.expect({"response":"pong"}, done);


      });

  })
})
