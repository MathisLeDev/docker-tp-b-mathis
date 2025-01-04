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

## Axios

An axios instance is already created in the **app/axios/axiosIntance.tsx**, please use it to make requests to the backend.

## Tailwindcss

### Usage

Add your Tailwind CSS classes to the `className` attribute of the HTML element you want to style.
See the docs to get started with Tailwind CSS: https://tailwindui.com/components

### Custom Styles

Custom styles can be added to the `tailwind.config.js` file in the theme section.
See the docs: https://tailwindcss.com/docs/adding-custom-styles

## React Router (v6.4)

### Usage

https://reactrouter.com/en/main/start/overview

## RxJS

### Usage

#### Alert Service

Used here to prevent the need to pass props down to child components to display alerts.
The alert service is used to display alerts in the application.
You can call the exported func addAlert(alert: Alert) wherever you want to show an alert. The alert will be displayed at the top of the page in <Root />.
More info can be found here : https://react-rxjs.org/docs/getting-started
