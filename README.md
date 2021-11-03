# Pre-requisites

We will be making use of the data provided in https://docs.google.com/spreadsheets/d/1sCgmzBIq2K9jUckLuYSWbDq4CuNUfdtuE6a5xI3I5Hw/edit#gid=0

The spreadsheet id has already been configured to config.js file which can be found in the src folder.  You need to add the google sheet API key to access the data during runtime.  For that you myst create a project in the Google Developer API dashboard.

You can create a new project through this link: https://console.cloud.google.com/projectcreate

Once the project is created, you’ll be redirected to Google Developer API dashboard.

(In case you have already created a project in Google Developer API dashboard in the past you can open: https://console.cloud.google.com/projectcreate .  This will take you to the default project on your account.)

Now, we will enable Google Sheets API for our app. For this in the APIs box, click “Go to APIs overview”. Once you click “Enable APIs and Services” you’ll be presented with the API Library and we’ll go ahead and search for “Google Sheets API”.

Once you find it, click “Enable” and after it is processed head over to the sidebar. There head over to “Credentials” and click the “Create credentials” button and select “API Key”. Click the “Restrict Key” and set a name for it.

Save the key generated, as we’ll need it to pull data from our Google Sheet later.

Under “API Restrictions” select the “Google Sheets API” and save. Now, we are good to go for our next step where we’ll connect Google Sheets API and fetch the data.

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
