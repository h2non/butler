!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.butler=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./service":2,"./store":3,"./utils":4}],2:[function(require,module,exports){
var serviceWorker = navigator.serviceWorker
var serviceInstance = null
var serviceWorkerInstance = null

module.exports = serviceFactory

function serviceFactory(options) {
  if (!serviceInstance) {
    serviceInstance = new Service(options)
  }
  return serviceInstance
}

function Service(options) {
  this.service = getServiceWorker(options)
}

Service.prototype.append = function (id, config) {
  return sendWorkerMessage.call(this, { topic: 'butler.append', id: id, config: config })
}

Service.prototype.remove = function (id) {
  return sendWorkerMessage.call(this, { topic: 'butler.remove', id: id })
}

Service.prototype.flush = function (id) {
  return sendWorkerMessage.call(this, { topic: 'butler.flush' })
}

Service.prototype.unregister = function () {
  if (serviceWorkerInstance) {
    return serviceWorkerInstance.unregister()
  } else {
    return Promise.resolve(null)
  }
}

function sendWorkerMessage(data) {
  return new Promise(function (resolve, reject) {
    this.service().then(function (registration) {
      var client = getServiceWorkerClient(registration)
      client.postMessage(data)
      resolve(client)
    }).catch(reject)
  }.bind(this))
}

function getServiceWorkerClient(registration) {
  serviceWorkerInstance = registration
  if (registration.installing) {
    return registration.installing
  } else {
    return registration.active
  }
}

function getServiceWorker(options) {
  return function () {
    if (serviceWorkerInstance) {
      return Promise.resolve(serviceWorkerInstance)
    } else {
      return serviceWorker.register(options.path, { scope: getScriptScope(options) })
    }
  }
}

function getScriptScope(options) {
  var path = options.path
  if (!(/^http[s]?\/\//i.test(path))) {
    path = location.origin + path
  }
  return new URL(path).pathname.split('/').slice(0, -1).join('/') + '/'
}

},{}],3:[function(require,module,exports){
var buf = []
var store = exports

store.append = function (data) {
  buf.push(data)
}

store.remove = function (id) {
  var item = store.get(id)
  if (item) buf.splice(buf.indexOf(item), 1)
}

store.get = function (id) {
  var i, l, isString = typeof id === 'string'
  for (i = 0, l = buf.length; i < l; i += 1) {
    if ((isString && buf[i].id === id) || buf[i] === id) {
      return buf[i]
    }
  }
  return null
}

store.all = function () {
  return buf.map(function (mock) {
    return { id: mock.id, config: mock.config }
  })
}

store.flush = function () {
  buf.splice(0)
}

},{}],4:[function(require,module,exports){
exports.merge = function (target, origins) {
  var origins = Array.prototype.slice.call(arguments).slice(1)
  origins.forEach(function (origin) {
    for (var prop in origin) {
      target[prop] = origin[prop]
    }
  })
  return target
}

exports.uuid = function () {
  var uuid = '', i, random
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) uuid += '-'
    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16)
  }
  return uuid
}

},{}]},{},[1])(1)
});