SOURCE_DIR=js
TARGET_FILE=bundle.js

all:
	node_modules/typescript/bin/tsc -p $(SOURCE_DIR) 
	browserify $(SOURCE_DIR)/app.js -o $(SOURCE_DIR)/$(TARGET_FILE)

run-server:
	python -m SimpleHTTPServer 9001
	open http://localhost:9001/

