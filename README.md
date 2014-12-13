# butler [![Build Status](https://api.travis-ci.org/h2non/butler.svg?branch=master)][travis] [![Version](https://img.shields.io/bower/v/butler.svg)](https://github.com/h2non/butler/releases) [![Code Climate](https://codeclimate.com/github/h2non/butler/badges/gpa.svg)](https://codeclimate.com/github/h2non/butler) [![Stories in Ready](https://badge.waffle.io/h2non/butler.png?label=ready&title=Ready)](https://waffle.io/h2non/butler)

> Work in progress!

<img src="http://oi58.tinypic.com/x8607.jpg" width="300" align="right" style="float: right" />

An elegant, friendly and courteous butler to avoid headaches with [ServiceWorkers][spec]
in a clean, elegant and simple programmatic in order to provide a better approach for insanely great use
of ServiceWorker features underling ugly implementation details

ServiceWorker introduces interesting, reliable and powerful ways to do awesome
things in the browsers which will evolve the Web to the next-level

**Note** that **ServiceWorker is still an experimental technology** and its standard is [under active discussion][discussion] and it is [not currently supported][browser-support] by latest production browsers

Aditionally you should consider that this library is very much a work in progress, as it is a hacking-driven implementation, therefore important changes can be done in a near future and API retrocompatibility is not premise

If you are new with ServiceWorker, before getting started you could take a look to the [explainer][explainer] document, [HTML5rocks introduction][html5rocks] or the [draft specification][spec]

## Installation

Via [Bower](http://bower.io)
```bash
bower install butler
```

Via [Component](https://github.com/component/component)
```bash
component install h2non/butler
```

Or loading the script remotely
```html
<script src="//cdn.rawgit.com/h2non/butler/0.1.0/butler.js"></script>
```

### Setup

Due to ServiceWorkers [security limitations][serviceWorkerGettingStarted], it's required to copy the `butler.worker.js` source in the root directory of your application (although, you could use the HTTP server rewrite rules to do the same in remote servers) in order to be enable the Service Worker control into the desired page scope (defaults to `/`)

Example command if you are using Bower as package manager
```bash
cp ./bower_components/butler/butler.worker.js .
```

### Chrome Canary setup

To start hacking with ServiceWorker you should enable the "experimental Web Platform features" flag in Canary.
You can do it opening `chrome://flags`. Then you should restart the browser

#### How to debug

Open `chrome://serviceworker-internals/`, or alternatively use `chrome://inspect/#service-workers`

<!--
## Limitations notes
-->

## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
Canary ✔ | Nightly ✔ | No | ? | No |

For more information about browsers support see "[is ServiceWorker ready?](https://jakearchibald.github.io/isserviceworkerready/)" site

## Basic usage

> To Do

## API

### butler([ path, options ])

Create a new butler instance

**path** argument points to the `butler.worker.js`. Default to `/butler.worker.js`

Supported options are:

- **scope** `string` - Worker control path scope. Default to `/`


### butler.workerPath
Type: `string`

Bock worker file path. Default to `/butler.worker.js`.
Be aware with the `scope` security limitation

### butler.VERSION
Type: `string`

Current library semantic version

## Contributing

Wanna help? Cool! It will be appreciated :)

You must add new test cases for any new feature or refactor you do,
always following the same design/code patterns that already exist

### Development

Only [node.js](http://nodejs.org) is required for development

Clone the repository
```bash
$ git clone https://github.com/h2non/butler.git && cd butler
```

Install dependencies
```bash
$ npm install
```

Generate browser bundle source
```bash
$ make browser
```

Run tests
```bash
$ make test
```

See the [examples](https://github.com/h2non/butler/tree/master/examples)
```bash
$ ./node_modules/.bin/http-server
```

## License

MIT - Tomas Aparicio

[serviceWorkerGettingStarted]: https://github.com/slightlyoff/ServiceWorker/blob/master/explainer.md#getting-started
[discussion]: https://github.com/slightlyoff/ServiceWorker/issues
[browser-support]: https://jakearchibald.github.io/isserviceworkerready/
[spec]: https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html
[explainer]: https://github.com/slightlyoff/ServiceWorker/blob/master/explainer.md#getting-started
[html5rocks]: http://www.html5rocks.com/en/tutorials/service-worker/introduction/
[travis]: https://travis-ci.org/h2non/butler
[fetch-credentials]: https://fetch.spec.whatwg.org/#concept-request-credentials-mode
