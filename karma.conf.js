module.exports = function(config) {
  config.set({
    files: [
      'node_modules/chai/chai.js',
      'bower_components/lil-http/http.js',
      'butler.js',
      'butler.worker.js',
      'test/butler.js'
    ],
    urlRoot: '/base',
    frameworks: ['mocha'],
    customLaunchers: {
      ChromeServiceWorker: {
        base: 'ChromeCanary',
        flags: [
          '--enable-experimental-web-platform-features',
          '--enable-service-worker-sync'
        ]
      }
    },
    browsers: [
      'ChromeServiceWorker'
    ],
    reports: ['progress'],
    singleRun: false
  })
}
