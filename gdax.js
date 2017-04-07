var Gdax = require('gdax');

var lastPrice = null

function processMatch(lifxClient, maxClient, matchData) {
  var change = matchData.price - lastPrice
  matchData.change = String(change)
  lastPrice = matchData.price
  console.log(matchData.price + ' ' + matchData.side + ' ' + matchData.size + ' | change:' + matchData.change);
  var light = lifxClient.light('Piano') // TODO: pass target light as CLI param
  if(matchData.side === 'sell') light.color(0, 50, 30, 1000)
  if(matchData.side === 'buy') light.color(90, 75, 30, 1000)
  maxClient.send(matchData)
}

function initGdax (lifxClient, maxClient) {
  var publicClient = new Gdax.PublicClient();
  var websocket = new Gdax.WebsocketClient(['ETH-USD']);

  websocket.on('message', function(data) {
    if(data.type === 'match') {
      processMatch(lifxClient, maxClient, data)
    }
  });
}

module.exports = initGdax
