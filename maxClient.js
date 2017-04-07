var net = require('net');
var dgram = require('dgram');
var _ = require('lodash/fp')

function init() {
  var client = new net.Socket();

  client.on('close', function() {
    console.log('node client closed');
  });

  let send = function(message) {
    client.connect(6000, '127.0.0.1', function() {
      client.end(message);
    });
  }

  var wrapper = {
    send: send
  }

  return wrapper
}

function initUdp() {
  var PORT = 6000;
  var HOST = '127.0.0.1';

  var client = dgram.createSocket('udp4');

  let send = function(data) {

    var message = _.flow(
      _.pick(['size', 'price', 'change']),
      JSON.stringify,
      function(jsonString) { return new Buffer(jsonString) }
    )(data)

    client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
      if (err) throw err;
      // client.close();
    });
  }

  var wrapper = {
    send: send
  }

  return wrapper
}

module.exports = {
  init: initUdp
}
