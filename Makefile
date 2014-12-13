VERSION = 0.1.0
BROWSERIFY = node ./node_modules/.bin/browserify
MOCHA = ./node_modules/.bin/mocha
UGLIFYJS = ./node_modules/.bin/uglifyjs
KARMA = ./node_modules/karma/bin/karma
MOCHA_PHANTOM = ./node_modules/.bin/mocha-phantomjs -s localToRemoteUrlAccessEnabled=true -s webSecurityEnabled=false
BANNER = "/*! butler - v$(VERSION) - MIT License - https://github.com/h2non/butler */"

default: all
all: test
browser: banner browserify uglify
test: browser mocha
test-browser: karma

banner:
	@echo $(BANNER) > butler.js

browserify:
	$(BROWSERIFY) \
		--exports require \
		--standalone butler \
		--entry ./lib/index.js > ./butler.js

uglify:
	$(UGLIFYJS) butler.js --mangle --preamble $(BANNER) --source-map butler.min.js.map --source-map-url http://cdn.rawgit.com/h2non/butler/$(VERSION)/butler.min.js.map > butler.min.js

mocha:
	$(MOCHA) --reporter spec --ui tdd test/utils test/store

loc:
	wc -l butler.js

karma:
	$(KARMA) start

gzip:
	gzip -c butler.min.js | wc -c

publish: browser
	git push --tags origin HEAD:master
