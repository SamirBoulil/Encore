.PHONY: install

TARGET_FOLDER=dist
PUBLIC_FOLDER=public
TARGET_FILE=js/bundle.js
SOURCE_DIR=js

all:
	node_modules/typescript/bin/tsc -p $(SOURCE_DIR)
	browserify $(SOURCE_DIR)/app.js -o $(TARGET_FILE)
	cat node_modules/todomvc-common/base.css node_modules/todomvc-app-css/index.css > $(PUBLIC_FOLDER)/app.css

install:
	npm install
	typings install

prod: | 	install
	# Init dist directories
	mkdir -p dist/node_modules
	mkdir -p dist/public
	mkdir -p dist/js
	# Copy assets
	cp -rf node_modules/todomvc-common dist/node_modules/.
	cp -rf node_modules/react dist/node_modules/.
	cp -rf node_modules/classnames dist/node_modules/.
	cp -rf public dist/.
	cp index.html dist/index.html
	# Compile and pack JS & css
	node_modules/typescript/bin/tsc -p $(SOURCE_DIR)
	browserify $(SOURCE_DIR)/app.js -o $(TARGET_FOLDER)/$(TARGET_FILE)
	cat node_modules/todomvc-common/base.css node_modules/todomvc-app-css/index.css > $(TARGET_FOLDER)/$(PUBLIC_FOLDER)/app.css

run-server:
	python -m SimpleHTTPServer 9001
	open http://localhost:9001/

run-server-prod:
	cd dist && python -m SimpleHTTPServer 9002 dist
	open http://localhost:9002/
	cd ..

deploy:
	firebase deploy
