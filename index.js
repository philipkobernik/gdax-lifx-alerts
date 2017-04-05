var initGdax = require('./gdax')
var lifxClient = require('./lifx').init()

initGdax(lifxClient);
