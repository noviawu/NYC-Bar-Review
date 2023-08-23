# How To Run Development Mode Locally

## In the project directory/backend, you can run:

### `npm start`

Runs the backend in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.
Also can use PostMan to test the API endpoints.

## In the project directory/frontend, you can run:

### `npm run build`

Builds the project before deploying

### `npm start`

Runs the frontend in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view the react app in your browser.
Use the browser and console to test and debug.

### `firebase deploy`

Deploys the latest changes to firebase.\
Currently not displaying correctly

# Project Notes and Config

For this project Firebase Auth and Firestore are used, so no need for backend
ESLint is not setup.
V3 of Material UI is used for styling, to be compatible with downgraded React version. https://v3.mui.com/
