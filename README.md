# CS5610 Final Project
This project is called CoviForum - 'A Discussion Forum Board to Discuss the effects of the COVID-19 Pandemic'

## Heroku Hosting:

https://coviforum.herokuapp.com/

## Start Heroku
heroku local web

## Start Node/Express Server on Heroku
heroku run node server-backend/app/server.js

#### ClearDB-MySQL Setup
heroku config | grep CLEARDB_COPPER_URL

mysql://b433a5a4586959:afead08f@us-cdbr-east-03.cleardb.com/heroku_d12c9954cf94e81?reconnect=true

heroku config:set CLEARDB_COPPER_URL='mysql://adffdadf2341:adf4234@us-cdbr-east.cleardb.com/heroku_db?reconnect=true'

Change db.config.js from LOCAL MySQL WorkBench to:
module.exports = {
  HOST: "us-cdbr-east-03.cleardb.com",
  USER: "b433a5a4586959",
  PASSWORD: "afead08f",
  DB: "heroku_d12c9954cf94e81"
};

Add Tables:

mysql --host=us-cdbr-east-03.cleardb.com --user=b433a5a4586959 --password=afead08f --reconnect heroku_d12c9954cf94e81

### Heroku Addons:
ClearDB MySQL

## To Run This Application:

#### Frontend:
Open terminal inside the root folder, enter:
npm start

#### Backend:
Open another terminal, enter:
cd server-backend
node server.js

OR

#### Front & Back end
Type:
npm run start:all (IN PROGRESS)

## This project was built utilizing the following API:
ReactJS is the widely used frontend framework, and JSON Web Token, JWT for short

### Front-end:
React 
React Router
React Hooks 
Token-based Authentication
LocalStorage
Axios
Bootstrap 

### Modules:
React 16
react-router-dom 5.1.2
axios 0.19.2
react-validation 3.0.7
Bootstrap 4
validator 12.2.0

## Back-end:
JWT Authentication
Express Server
Sequelize
MySQL

### Modules:
Express 4.17.1
jsonwebtoken 8.5.1
Sequelize 5.21.3
MySQL

### 3rd Party API
Publically Available API
COVID Stats API based on Location
Google Maps API
https://www.google.com/search?q=covid+stats&oq=covid+stats&aqs=chrome..69i57j0i402l2j0i433j0i131i433l2j0i10i131i433j0l2j0i131i433.1816j0j7&sourceid=chrome&ie=UTF-8

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
