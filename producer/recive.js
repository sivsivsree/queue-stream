var amqp = require('amqplib/callback_api');

amqp.connect('amqp://user:bitnami@localhost:5672/', function (err, conn) {
  for (let i = 0; i < 1000; i++) {
    conn.createChannel(function (err, ch) {
      var ex = 'LIVEONE';
      ch.assertExchange(ex, 'topic', { durable: false });

      ch.assertQueue('', { exclusive: true }, function (err, q) {
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
        ch.bindQueue(q.queue, ex, 'driver1');

        ch.consume(q.queue, function (msg) {
          console.log("data: " + msg.content.toString());
        }, { noAck: true });
      });
    });
  }
});





