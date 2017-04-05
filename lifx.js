var Lifx = require('node-lifx').Client;

function init() {
  var lifxClient = new Lifx();

  lifxClient.on('error', function(err) {
    console.log('LIFX error:\n' + err.stack);
    lifxClient.destroy();
  });

  lifxClient.on('light-new', function(light) {
    console.log('New light found. ID:' + light.id + ', IP:' + light.address + ':' + light.port);
  });

  lifxClient.on('light-online', function(light) {
    console.log('Light back online. ID:' + light.id + ', IP:' + light.address + ':' + light.port);
  });

  lifxClient.on('light-offline', function(light) {
    console.log('Light offline. ID:' + light.id + ', IP:' + light.address + ':' + light.port);
  });

  lifxClient.on('listening', function() {
    var address = lifxClient.address();
    console.log(
      'Started LIFX listening on ' +
      address.address + ':' + address.port + '\n'
    );
  });

  lifxClient.init();
  return lifxClient
}

module.exports = {
  init: init
}
