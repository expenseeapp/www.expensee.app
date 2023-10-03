APP_NAME   := $(shell cat package.json | jq -r '.name')
BUILD_VERSION   := $(shell cat package.json | jq -r '.version')

build:
	docker build -t ${APP_NAME}:${BUILD_VERSION} .
start:
	docker run -p 3000:3000 ${APP_NAME}:${BUILD_VERSION}
generate-icon: 
	./scripts/generate-icons.sh
