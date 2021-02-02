all:
	test build deploy

build:
	cd infra && docker-compose build

test:
	npm test

deploy:
	cd infra && docker-compose up -d
