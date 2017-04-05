var Gdax = require('gdax');

function initGdax (lifxClient) {
  var publicClient = new Gdax.PublicClient();
  var websocket = new Gdax.WebsocketClient(['ETH-USD']);

  websocket.on('message', function(data) {
    if(data.type === 'match') {
      console.log(data.price + ' ' + data.side + ' ' + data.size);
      var light = lifxClient.light('Piano') // TODO: pass target light as CLI param
      if(data.side === 'sell') light.color(0, 50, 30, 1000)
      if(data.side === 'buy') light.color(90, 75, 30, 1000)
    }
  });
}

module.exports = initGdax
