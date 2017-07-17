var logFactory = require('./log.js');
var logger = logFactory.create("rest");

var amqp = require('amqplib/callback_api');

var channel;

amqp.connect('amqp://'+config.rabbitmq.host, function(err, conn) {
  if (err) logger.error("Unable to connect to rabbitmq " + config.rabbitmq.host);

  conn.createChannel(function(err, ch) {
    if (err) logger.error("Unable to create channel on rabbitmq " + config.rabbitmq.host);
    channel = ch;

    //ch.assertExchange(ex, 'fanout', {durable: false});
    channel.assertQueue(config.rabbitmq.queue, {durable: true});

    //Send sample mesage
    var msg = (new Date()).getTime()+ " Test ";
    channel.sendToQueue(config.rabbitmq.queue, new Buffer(msg), {persistent: true});
    logger.debug(" [->] %s", msg);
  });

  //setTimeout(function() { conn.close(); process.exit(0) }, 500);
});

function publish(msg) {
  if (!channel){
    logger.error("Unable to send message to empty channel");
    return ;
  }
  //channel.publish("logs", '', new Buffer(msg)) ;
  channel.sendToQueue(config.rabbitmq.queue, new Buffer(msg), {persistent: true});
  logger.debug(" [->] %s", msg);
}

module.exports = {
    publish: publish
}