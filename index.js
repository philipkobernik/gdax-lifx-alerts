var initGdax = require('./gdax')
var lifxClient = require('./lifx').init()
var maxClient = require('./maxClient').init()

initGdax(lifxClient, maxClient);
