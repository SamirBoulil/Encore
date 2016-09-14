TARGET_FOLDER=dist
PUBLIC_FOLDER=public
TARGET_FILE=js/bundle.js
SOURCE_DIR=js

all:
	node_modules/typescript/bin/tsc -p $(SOURCE_DIR)
	browserify $(SOURCE_DIR)/app.js -o $(TARGET_FILE)
	cat node_modules/todomvc-common/base.css node_modules/todomvc-app-css/index.css > $(PUBLIC_FOLDER)/app.css

prod:
	node_modules/typescript/bin/tsc -p $(SOURCE_DIR)
	browserify $(SOURCE_DIR)/app.js -o $(TARGET_FOLDER)/$(TARGET_FILE)

install:
	npm install
	typings install

run-server:
	python -m SimpleHTTPServer 9001
	open http://localhost:9001/

run-server-prod:
	cd dist && python -m SimpleHTTPServer 9002 dist
	open http://localhost:9002/
	cd ..

deploy:
	cat node_modules/todomvc-common/base.css node_modules/todomvc-app-css/index.css > $(TARGET_FOLDER)/app.css
	mkdir -p dist/js/node_modules
	cp -rf node_modules/todomvc-common dist/js/node_modules/.
	cp -rf node_modules/react dist/js/node_modules/.
	cp -rf node_modules/classnames dist/js/node_modules/.
