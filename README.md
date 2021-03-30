# cz3002-fe
[![Build Status](https://travis-ci.com/bryanscw/cz3002-fe.svg?token=WtBjbJiVVLc1zKyr5kpw&branch=main)](https://travis-ci.com/bryanscw/cz3002-fe)

# 1. Deployment

The following dependencies are required:

* Build-essential
* [Docker](https://docs.docker.com/engine/install/)
* [Docker-compose](https://docs.docker.com/compose/install/)

To install the required dependencies, run the following commands:
```
sudo apt install build-essential
```

## 1.1. Remote
This project uses Docker and Docker-compose to deploy the application in a stable environment. To deploy, run the following command:

`sudo make all`

## 1.2. Local

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## 2. Notes
### 2.1. Makefile
The Makefile contains the following options:
```
# Executes clean, test, build and deploy steps
sudo make all

# Installs dependencies for the ReactJS application in the package.json file
sudo make install

# Builds the ReactJS application
sudo make build

# Tests the current ReactJS code
sudo make test

# Removes and re-creates the ReactJS application container
sudo make deploy

# Cleans up all unused Docker stuff (networks, containers etc)
sudo make clean

# Removes and re-deploys the ReactJS application
sudo make restart
```