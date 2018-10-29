var amqp = require('amqplib/callback_api');

amqp.connect('amqp://user:bitnami@localhost:5672/', function(err, conn) {


  conn.createChannel(function(err, ch) {
    var ex = 'log';
    var msg = process.argv.slice(2).join(' ') || 'Hello World!';

    ch.assertExchange(ex, 'fanout', {durable: true});
    setInterval(function() { 
      ch.publish(ex, '', new Buffer(msg));
      console.log(" [x] Sent %s", msg);
    }, 500);
  });


});
