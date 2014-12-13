var store = require('./store')
var service = require('./service')
var merge = require('./utils').merge
var hasServiceWorker = 'serviceWorker' in navigator

module.exports = butler

function butler(url, options) {
  var service = resolveServiceWorker(options)
}

butler.VERSION = '0.1.0-beta.1'
butler.workerPath = '/butler.worker.js'

butler.isControllable = butler.isEnabled = function () {
  return navigator.serviceWorker.controller != null
}

butler.stop = function () {
  return service().unregister()
}

butler.cleanAll = function () {
  store.flush()
  return service().flush()
}

butler.entries = function () {
  return store.all()
}

function resolveServiceWorker(options) {
  if (!hasServiceWorker) {
    throw new Error('ServiceWorker is not supported in the current browser')
  }
  return service(merge({ path: butler.workerPath }, options))
}
