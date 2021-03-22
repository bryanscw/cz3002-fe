all: clean test build deploy

install:
	npm install

build:
	cd infra && docker-compose build

test:
	npm test -- --watchAll=false

deploy:
	cd infra && docker-compose up -d

clean:
	cd infra && docker-compose down

restart:
	cd infra && docker-compose down && docker-compose up -d
